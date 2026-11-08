function jsonResponse(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
      ...headers
    }
  });
}

async function handleWhatsAppInvite(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Methode nicht erlaubt.' }, 405, { Allow: 'POST' });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Ungültige Anfrage.' }, 400);
  }

  const token = typeof payload?.token === 'string' ? payload.token : '';
  if (!token) {
    return jsonResponse({ error: 'CAPTCHA-Bestätigung fehlt.' }, 400);
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.WHATSAPP_GROUP_INVITE_URL) {
    return jsonResponse({ error: 'Die WhatsApp-Gruppe ist momentan nicht verfügbar.' }, 503);
  }

  let verificationResponse;
  try {
    verificationResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: token,
          remoteip: request.headers.get('CF-Connecting-IP') || ''
        })
      }
    );
  } catch {
    return jsonResponse({ error: 'CAPTCHA konnte nicht geprüft werden.' }, 502);
  }

  if (!verificationResponse.ok) {
    return jsonResponse({ error: 'CAPTCHA konnte nicht geprüft werden.' }, 502);
  }

  const verification = await verificationResponse.json();
  if (!verification.success) {
    return jsonResponse({ error: 'CAPTCHA-Bestätigung abgelehnt.' }, 403);
  }

  let inviteUrl;
  try {
    inviteUrl = new URL(env.WHATSAPP_GROUP_INVITE_URL);
  } catch {
    return jsonResponse({ error: 'Die WhatsApp-Einladung ist nicht korrekt konfiguriert.' }, 503);
  }

  if (inviteUrl.protocol !== 'https:' || inviteUrl.hostname !== 'chat.whatsapp.com') {
    return jsonResponse({ error: 'Die WhatsApp-Einladung ist nicht korrekt konfiguriert.' }, 503);
  }

  return jsonResponse({ redirectUrl: inviteUrl.toString() });
}

function handleWhatsAppProbetraining(request, env) {
  if (request.method !== 'GET') {
    return jsonResponse({ error: 'Methode nicht erlaubt.' }, 405, { Allow: 'GET' });
  }

  if (!env.WHATSAPP_PROBETRAINING_LINK) {
    return jsonResponse({ error: 'Der Probetraining-Kontakt ist momentan nicht verfügbar.' }, 503);
  }

  let contactUrl;
  try {
    contactUrl = new URL(env.WHATSAPP_PROBETRAINING_LINK);
  } catch {
    return jsonResponse({ error: 'Der Probetraining-Kontakt ist nicht korrekt konfiguriert.' }, 503);
  }

  if (contactUrl.protocol !== 'https:' || contactUrl.hostname !== 'wa.me') {
    return jsonResponse({ error: 'Der Probetraining-Kontakt ist nicht korrekt konfiguriert.' }, 503);
  }

  return Response.redirect(contactUrl.toString(), 302);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/whatsapp-invite') {
      return handleWhatsAppInvite(request, env);
    }

    if (url.pathname === '/api/whatsapp-probetraining') {
      return handleWhatsAppProbetraining(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};
