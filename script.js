/**
 * Leguane Landau e.V. – Website JavaScript
 * Pure Vanilla JavaScript – No Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  document.documentElement.classList.add('js');

  // --------------------------------------------------------------------------
  // 1. Dynamic Current Year in Footer
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. German / English Content
  // --------------------------------------------------------------------------
  let currentLanguage = 'de';
  const languageButtons = document.querySelectorAll('.language-button');
  const translationEntries = [
    { selector: '.skip-link', de: 'Zum Hauptinhalt springen', en: 'Skip to main content' },
    { selector: '.nav-link', de: ['Kontakt', 'Über uns', 'Angebot', 'Termine', 'Galerie', 'FAQ', 'Probetraining'], en: ['Contact', 'About us', 'Offers', 'Events', 'Gallery', 'FAQ', 'Try-out'] },
    { selector: '.badge-pill', de: 'Neu in Landau? Schnuppertraining jederzeit!', en: 'New in Landau? Come try Roundnet anytime!' },
    { selector: '.hero-subtitle', de: 'Dynamisch, teamorientiert und offen für alle. Entdecke Roundnet in Landau und werde Teil unserer aktiven Community!', en: 'Dynamic, team-focused and open to everyone. Discover Roundnet in Landau and join our active community!' },
    { selector: '.hero-actions .btn', de: 'Probetraining', en: 'Try-out' },
    { selector: '.hero-highlight-item .highlight-label', de: ['Kostenloses Schnuppern', 'Spielstärken willkommen'], en: ['Free try-out', 'All skill levels welcome'] },
    { selector: '.visual-badge', de: 'Aktiv in Landau', en: 'Active in Landau' },
    { selector: '.hero-visual-card h3', de: 'Regelmäßiges Training', en: 'Regular training' },
    { selector: '.hero-visual-card p', de: 'Draußen im Park & in der Halle', en: 'Outdoors in the park & indoors' },
    { selector: '.visual-tag', de: 'Lerne neue Leute kennen', en: 'Meet new people' },
    { selector: '#contact .section-tag', de: 'Kontakt', en: 'Contact' },
    { selector: '#contact-title', de: 'Lust auf eine Runde?', en: 'Ready for a round?' },
    { selector: '#contact .section-description', de: 'Schreib uns kurz und komm kostenlos zum Probetraining vorbei. Oder verabrede dich unkompliziert zum freien Spielen.', en: 'Send us a quick message and join a free try-out. Or arrange a casual game with the community.' },
    { selector: '.whatsapp-join-eyebrow', de: ['Kostenloses Probetraining', 'Spontan spielen'], en: ['Free try-out', 'Casual games'] },
    { selector: '.whatsapp-join-card h3', de: ['WhatsApp-Nachricht schreiben', 'Roundnet außerhalb des Vereins'], en: ['Write a WhatsApp message', 'Roundnet outside the club'] },
    { selector: '.whatsapp-join-card > div:first-child p', de: ['Schick uns eine kurze Nachricht. Wir finden gemeinsam einen passenden Trainingstermin.', 'Du möchtest einfach locker draußen spielen? In unserer Gruppe findest du Mitspielerinnen und Mitspieler.'], en: ['Send us a quick message and we will find a suitable training time together.', 'Want to play casually outdoors? Find fellow players in our group.'] },
    { selector: '.whatsapp-button', de: ['Nachricht', 'Gruppe'], en: ['Message', 'Group'] },
    { selector: '.contact-quick-label', de: ['Instagram', 'E-Mail'], en: ['Instagram', 'Email'] },
    { selector: '.contact-quick-link strong', de: ['Schreib uns auf Insta', 'Mail, falls das Fax spinnt'], en: ['Message us on Insta', 'Email us anytime'] },
    { selector: '#about .section-tag', de: 'Wer wir sind', en: 'Who we are' },
    { selector: '#about-title', de: 'Über die Leguane Landau', en: 'About Leguane Landau' },
    { selector: '#about .section-description', de: 'Gemeinsam Sport treiben, voneinander lernen und Spaß haben – das steht bei uns im Mittelpunkt.', en: 'Playing sports together, learning from one another and having fun – that is what matters to us.' },
    { selector: '.about-text-block h3', de: 'Unsere Mission', en: 'Our mission' },
    { selector: '.about-text-block p', de: ['Die Leguane Landau e.V. bringen sportbegeisterte Menschen in Landau zusammen. Egal, ob du Student, Schüler, Berufstätiger oder einfach neugierig bist: Bei uns steht die Freude an Bewegung und Fairplay an erster Stelle.', 'Roundnet ist schnell, fair und macht ab der ersten Minute Spaß. Wir bieten regelmäßige Spieltreffs, gezieltes Techniktraining und organisieren lockere Turniere für jedes Level.'], en: ['Leguane Landau e.V. brings sports enthusiasts together in Landau. Whether you are a student, working professional or simply curious, the joy of movement and fair play comes first here.', 'Roundnet is fast, fair and fun from the very first minute. We offer regular game meet-ups, focused skills training and relaxed tournaments for every level.'] },
    { selector: '.about-image-card figcaption strong', de: ['Gemeinschaft', 'Schneller Einstieg'], en: ['Community', 'Easy to start'] },
    { selector: '.about-image-card figcaption span', de: ['Offen, fair und gemeinsam auf dem Feld.', 'In wenigen Minuten erklärt und direkt mitspielen.'], en: ['Open, fair and together on the court.', 'Explained in minutes so you can play right away.'] },
    { selector: '#offers .section-tag', de: 'Unser Angebot', en: 'What we offer' },
    { selector: '#offers-title', de: 'Was dich bei uns erwartet', en: 'What to expect' },
    { selector: '#offers .section-description', de: 'Alles, was du für einen gelungenen Einstieg und regelmäßiges Spielen brauchst.', en: 'Everything you need for a great start and regular games.' },
    { selector: '.feature-card h3', de: ['Angeleitetes Training', 'Sommer & Winter', 'Equipment', 'Social Events', 'Leistungssport'], en: ['Coached training', 'Summer & winter', 'Equipment', 'Social events', 'Competitive play'] },
    { selector: '.feature-card p', de: ['Für alle Spielstärken: Wir erklären die Basics, geben Tipps und helfen dir, dein Spiel weiterzuentwickeln.', 'Draußen unter der Sonne oder im Neonlicht der Halle – Roundnet gibt es bei uns das ganze Jahr.', 'Wir stellen alles zum Spielen und Trainieren. Du brauchst nur sportliche Kleidung, um zu starten.', 'Gemeinsame Feste und Aktivitäten abseits des Spielfelds bringen Menschen zusammen und lassen Freundschaften entstehen.', 'Du willst mehr erreichen? Finde gleichgesinnte Mitspieler*innen und engagiere dich in unseren Ligateams.'], en: ['For every skill level: we explain the basics, share tips and help you improve your game.', 'Under the sun or in the hall lights – Roundnet is played here all year round.', 'We provide everything for playing and training. Just bring comfortable sportswear.', 'Shared celebrations and activities away from the court bring people together and create friendships.', 'Want to go further? Meet like-minded players and get involved in our league teams.'] },
    { selector: '#events .section-tag', de: 'Kalender', en: 'Calendar' },
    { selector: '#events-title', de: 'Kommende Termine & Aktionen', en: 'Upcoming events & activities' },
    { selector: '#events .section-description', de: 'Hier findest du unsere nächsten Trainingseinheiten, Schnuppertage und Treffen.', en: 'Find our next training sessions, try-out days and meet-ups here.' },
    { selector: '.event-filter', de: ['Alle', 'Training', 'Turnier'], en: ['All', 'Training', 'Tournament'] },
    { selector: '.event-day', de: ['Montag', 'Montag', 'Dienstag', 'Montag', 'Dienstag', 'Donnerstag', '2027', 'Sommer 2027'], en: ['Monday', 'Monday', 'Tuesday', 'Monday', 'Tuesday', 'Thursday', '2027', 'Summer 2027'] },
    { selector: '.badge-tag', de: ['Noch nicht bestätigt', 'Social Event'], en: ['Not confirmed', 'Social event'] },
    { selector: '.event-details h3', de: ['Training', 'Freies Spiel', 'Training & freies Spiel', 'Training', 'Training', 'Training', 'Leguan Cup 2027', 'Sommerfest'], en: ['Training', 'Open play', 'Training & open play', 'Training', 'Training', 'Training', 'Leguan Cup 2027', 'Summer party'] },
    { selector: '.event-location a', de: ['IGS Sporthalle Ost, Landau', 'OHG Sporthalle, Landau', 'OHG Sporthalle, Landau', 'Kunstrasenplätze am Ebenberg', 'Kunstrasenplätze am Ebenberg', 'Kunstrasenplätze am Ebenberg'], en: ['IGS sports hall east, Landau', 'OHG sports hall, Landau', 'OHG sports hall, Landau', 'Ebenberg artificial turf pitches', 'Ebenberg artificial turf pitches', 'Ebenberg artificial turf pitches'] },
    { selector: '.event-card:nth-child(7) .event-location, .event-card:nth-child(8) .event-location', de: ['Ort und Datum werden später bekannt gegeben.', 'Landau in der Pfalz'], en: ['Location and date will be announced later.', 'Landau in the Palatinate'] },
    { selector: '.event-desc', de: ['Angeleitetes Training für alle Spielstärken.', 'Lockere Runden, wechselnde Teams und neue Spielpartner.', 'Gemeinsam trainieren und danach direkt weiterspielen.', 'Training und Spiel unter freiem Himmel.', 'Technik, Taktik und entspannte Matches.', 'Wöchentlicher Treff für alle, die spielen möchten.', 'Sobald die Planung steht, findest du hier Anmeldung und alle Details.', 'Gemeinsam spielen, essen und den Sommer feiern.'], en: ['Coached training for all skill levels.', 'Relaxed rounds, changing teams and new playing partners.', 'Train together and keep playing afterwards.', 'Training and games outdoors.', 'Skills, tactics and relaxed matches.', 'A weekly meet-up for everyone who wants to play.', 'Once planning is complete, registration and details will be available here.', 'Play, eat and celebrate summer together.'] },
    { selector: '.event-action .btn', de: ['Updates anfragen', 'Details anfragen'], en: ['Request updates', 'Request details'] },
    { selector: '#gallery .section-tag', de: 'Eindrücke', en: 'Highlights' },
    { selector: '#gallery-title', de: 'Galerie', en: 'Gallery' },
    { selector: '#gallery .section-description', de: 'Ein Blick auf unsere Spieltage und Aktionen. Tausche diese Bilder einfach durch deine Vereinsfotos aus!', en: 'A look at our game days and activities. Replace these placeholders with your club photos!' },
    { selector: '.gallery-item figcaption', de: ['Training im Freien bei Sonnenschein', 'Spannende Rallies und Fairplay', 'Die Leguane nach dem Turnier', 'Action in der Halle in den Wintermonaten'], en: ['Outdoor training in the sunshine', 'Exciting rallies and fair play', 'The Leguan team after the tournament', 'Indoor action during winter'] },
    { selector: '.gallery-hint em', de: 'Empfohlene Bildformate: Querformat 4:3 für Training und Turniere, Hochformat 3:4 für Team- und Social-Momente. Ersetze die Platzhalter durch Vereinsfotos mit aussagekräftigem Alt-Text.', en: 'Recommended image formats: landscape 4:3 for training and tournaments, portrait 3:4 for team and social moments. Replace the placeholders with club photos and descriptive alt text.' },
    { selector: '.calendar-tryout-float', de: 'Reinschnuppern ↗', en: 'Try out ↗' },
    { selector: '#faq .section-tag', de: 'Häufige Fragen', en: 'Frequently asked questions' },
    { selector: '#faq-title', de: 'FAQ – Alles Wichtige auf einen Blick', en: 'FAQ – Everything at a glance' },
    { selector: '#faq .section-description', de: 'Du hast Fragen zum Einstieg? Hier sind die Antworten auf die häufigsten Fragen.', en: 'Questions about getting started? Here are answers to the most common questions.' },
    { selector: '.accordion-header > span:first-child', de: ['Kann ich auch als absolute/r Anfänger/in mitmachen?', 'Was muss ich zum ersten Training mitbringen?', 'Kostet das Probetraining etwas?', 'Wie hoch ist der Mitgliedsbeitrag?', 'Brauche ich einen festen Spielpartner?', 'Kann ich als Anfänger/in an Turnieren teilnehmen?', 'Was ist der Unterschied zwischen Roundnet und Spikeball?'], en: ['Can I join as a complete beginner?', 'What should I bring to my first training?', 'Does the try-out cost anything?', 'How much is the membership fee?', 'Do I need a fixed playing partner?', 'Can beginners take part in tournaments?', 'What is the difference between Roundnet and Spikeball?'] },
    { selector: '.accordion-body', de: ['Ja, absolut! Die meisten von uns haben ohne Vorkenntnisse angefangen. Bei jedem Training erklären wir die Regeln und zeigen dir die Grundschläge.', 'Nur bequeme Sportkleidung, passende Sportschuhe (für Rasen oder Hallenschuhe mit heller Sohle im Winter) und etwas zu trinken. Netze und Bälle stellen wir!', 'Nein, bis zu 2–3 Probetrainings sind bei uns komplett kostenlos und unverbindlich.', 'Der Mitgliedsbeitrag beträgt 72 € pro Jahr.', 'Nein! Du kannst jederzeit alleine kommen. Wir mischen Teams bei jedem Training durch, sodass du schnell neue Spielpartner findest.', 'Ja. Wir helfen dir beim Einstieg und empfehlen passende Turniere. Auch beim Leguan Cup sind Einsteigerinnen und Einsteiger willkommen.', 'Roundnet ist der Name der Sportart. Spikeball ist ein Markenname für ein entsprechendes Spielset – bei uns steht der Sport im Mittelpunkt.'], en: ['Absolutely! Most of us started without any previous experience. We explain the rules and basic shots at every training session.', 'Just comfortable sportswear, suitable shoes and something to drink. We provide the nets and balls!', 'No. Up to 2–3 try-out sessions are completely free and non-binding.', 'Membership costs €72 per year.', 'No! You can always come alone. We mix teams at every training session so you quickly find new playing partners.', 'Yes. We help you get started and recommend suitable tournaments. Beginners are welcome at the Leguan Cup too.', 'Roundnet is the name of the sport. Spikeball is a brand name for a corresponding game set – we focus on the sport.'] },
    { selector: '.footer-tagline', de: 'Dein Sportverein für Roundnet, Bewegung und Teamgeist in Landau in der Pfalz.', en: 'Your club for Roundnet, movement and team spirit in Landau in the Palatinate.' },
    { selector: '.links-col h4', de: 'Navigation', en: 'Navigation' },
    { selector: '.links-col a', de: ['Über uns', 'Unser Angebot', 'Termine', 'Galerie', 'FAQ', 'Kontakt'], en: ['About us', 'What we offer', 'Events', 'Gallery', 'FAQ', 'Contact'] },
    { selector: '.legal-col h4', de: 'Rechtliches & Datenschutz', en: 'Legal & privacy' },
    { selector: '.footer-modal-btn', de: ['Impressum', 'Datenschutz'], en: ['Legal notice', 'Privacy policy'] },
    { selector: '.cookie-notice', de: '100% Tracking- & Cookie-frei: Wir respektieren deine Privatsphäre und setzen keine Analyse-Cookies ein.', en: '100% tracking- and cookie-free: We respect your privacy and do not use analytics cookies.' },
    { selector: '.footer-bottom-container p:last-child', de: 'Made with ❤️ in Landau in der Pfalz', en: 'Made with ❤️ in Landau in the Palatinate' }
  ];

  function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    translationEntries.forEach(entry => {
      const elements = document.querySelectorAll(entry.selector);
      const values = Array.isArray(entry[language]) ? entry[language] : elements.length > 1
        ? Array(elements.length).fill(entry[language])
        : [entry[language]];
      elements.forEach((element, index) => {
        if (values[index] !== undefined) element.textContent = values[index];
      });
    });

    languageButtons.forEach(button => {
      const isActive = button.dataset.language === language;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    document.title = language === 'en'
      ? 'Leguane Landau e.V. – Roundnet & community in Landau'
      : 'Leguane Landau e.V. – Roundnet & Community in Landau';
    updateEvents();
  }

  languageButtons.forEach(button => {
    button.addEventListener('click', () => applyLanguage(button.dataset.language || 'de'));
  });

  // --------------------------------------------------------------------------
  // 3. Scroll-Scrubbed Background Video
  // --------------------------------------------------------------------------
  const backgroundVideo = document.getElementById('scrollBackgroundVideo');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (backgroundVideo && !prefersReducedMotion.matches) {
    let scrollProgress = 0;
    let syncRequest = 0;

    function syncVideoFrame() {
      syncRequest = 0;

      if (
        backgroundVideo.readyState < HTMLMediaElement.HAVE_METADATA ||
        !Number.isFinite(backgroundVideo.duration)
      ) {
        return;
      }

      const targetTime = scrollProgress * backgroundVideo.duration;
      if (Math.abs(backgroundVideo.currentTime - targetTime) > 1 / 30) {
        backgroundVideo.currentTime = targetTime;
      }
    }

    function scheduleVideoSync() {
      if (!syncRequest) {
        syncRequest = window.requestAnimationFrame(syncVideoFrame);
      }
    }

    function updateScrollProgress() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress.toString());
      scheduleVideoSync();
    }
    backgroundVideo.addEventListener('loadedmetadata', () => {
      backgroundVideo.play()
        .then(() => {
          backgroundVideo.pause();
          scheduleVideoSync();
        })
        .catch(() => {
          scheduleVideoSync();
        });
    }, { once: true });
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();
  }

  // --------------------------------------------------------------------------
  // 3. Protected WhatsApp Group Access
  // --------------------------------------------------------------------------
  const whatsappJoinButton = document.getElementById('whatsappJoinButton');
  const whatsappProbetrainingButton = document.getElementById('whatsappProbetrainingButton');
  const whatsappJoinStatus = document.getElementById('whatsappJoinStatus');
  const whatsappGroupStatus = document.getElementById('whatsappGroupStatus');
  const probetrainingToken = { value: '' };
  const groupToken = { value: '' };

  function setWhatsAppButtonDisabled(button, disabled) {
    if (button) {
      button.disabled = disabled;
    }
  }

  function setWhatsAppStatus(message) {
    if (whatsappJoinStatus) {
      whatsappJoinStatus.textContent = message;
    }
  }

  function setWhatsAppGroupStatus(message) {
    if (whatsappGroupStatus) {
      whatsappGroupStatus.textContent = message;
    }
  }

  function resetTurnstile(widgetId) {
    const widget = document.getElementById(widgetId);
    if (window.turnstile && widget) {
      window.turnstile.reset(widget);
    }
  }

  window.onWhatsAppTurnstileSuccess = (token) => {
    probetrainingToken.value = token;
    setWhatsAppButtonDisabled(whatsappProbetrainingButton, false);
    setWhatsAppStatus('');
  };

  window.onWhatsAppTurnstileExpired = () => {
    probetrainingToken.value = '';
    setWhatsAppButtonDisabled(whatsappProbetrainingButton, true);
    setWhatsAppStatus(currentLanguage === 'en' ? 'The verification expired. Please try again.' : 'Die Bestätigung ist abgelaufen. Bitte erneut bestätigen.');
  };

  window.onWhatsAppTurnstileError = () => {
    probetrainingToken.value = '';
    setWhatsAppButtonDisabled(whatsappProbetrainingButton, true);
    setWhatsAppStatus(currentLanguage === 'en' ? 'CAPTCHA verification is currently unavailable.' : 'Die CAPTCHA-Prüfung ist momentan nicht verfügbar.');
  };

  window.onWhatsAppGroupTurnstileSuccess = (token) => {
    groupToken.value = token;
    setWhatsAppButtonDisabled(whatsappJoinButton, false);
    setWhatsAppGroupStatus('');
  };

  window.onWhatsAppGroupTurnstileExpired = () => {
    groupToken.value = '';
    setWhatsAppButtonDisabled(whatsappJoinButton, true);
    setWhatsAppGroupStatus(currentLanguage === 'en' ? 'The verification expired. Please try again.' : 'Die Bestätigung ist abgelaufen. Bitte erneut bestätigen.');
  };

  window.onWhatsAppGroupTurnstileError = () => {
    groupToken.value = '';
    setWhatsAppButtonDisabled(whatsappJoinButton, true);
    setWhatsAppGroupStatus(currentLanguage === 'en' ? 'CAPTCHA verification is currently unavailable.' : 'Die CAPTCHA-Prüfung ist momentan nicht verfügbar.');
  };

  async function openWhatsAppContact(endpoint, loadingMessage, statusSetter, tokenState, button, widgetId) {
    if (!tokenState.value) {
      statusSetter(currentLanguage === 'en' ? 'Please complete the CAPTCHA verification first.' : 'Bitte bestätige zuerst die CAPTCHA-Prüfung.');
      return;
    }

    setWhatsAppButtonDisabled(button, true);
    statusSetter(loadingMessage);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenState.value })
      });

      const result = await response.json();
      if (!response.ok || typeof result.redirectUrl !== 'string') {
        throw new Error(result.error || (currentLanguage === 'en' ? 'The invitation could not be loaded.' : 'Einladung konnte nicht geladen werden.'));
      }

      window.location.assign(result.redirectUrl);
    } catch (error) {
      tokenState.value = '';
      statusSetter(error.message || (currentLanguage === 'en' ? 'The WhatsApp contact could not be loaded.' : 'WhatsApp-Kontakt konnte nicht geladen werden.'));
      setWhatsAppButtonDisabled(button, true);
      resetTurnstile(widgetId);
    }
  }

  whatsappJoinButton?.addEventListener('click', () => {
    openWhatsAppContact(
      '/api/whatsapp-invite',
      currentLanguage === 'en' ? 'Preparing invitation …' : 'Einladung wird vorbereitet …',
      setWhatsAppGroupStatus,
      groupToken,
      whatsappJoinButton,
      'whatsappGroupTurnstile'
    );
  });

  whatsappProbetrainingButton?.addEventListener('click', () => {
    openWhatsAppContact(
      '/api/whatsapp-probetraining',
      currentLanguage === 'en' ? 'Preparing WhatsApp contact …' : 'WhatsApp-Kontakt wird vorbereitet …',
      setWhatsAppStatus,
      probetrainingToken,
      whatsappProbetrainingButton,
      'whatsappTurnstile'
    );
  });

  // --------------------------------------------------------------------------
  // 4. Seasonal Events and Calendar Filters
  // --------------------------------------------------------------------------
  const eventFilters = document.querySelectorAll('.event-filter');
  const seasonalEvents = document.querySelectorAll('.seasonal-event');
  const allEvents = document.querySelectorAll('.event-card');
  const seasonStatus = document.getElementById('seasonStatus');
  let activeEventFilter = 'all';

  function getEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
  }

  function getCurrentSeason() {
    const today = new Date();
    const easter = getEasterDate(today.getFullYear());
    const isSummer = today >= easter && today.getMonth() <= 9;
    return isSummer ? 'summer' : 'winter';
  }

  function updateEvents() {
    const season = getCurrentSeason();
    if (seasonStatus) {
      seasonStatus.textContent = season === 'summer'
        ? (currentLanguage === 'en' ? 'Summer schedule active: April to October' : 'Sommerplan aktiv: April bis Oktober')
        : (currentLanguage === 'en' ? 'Winter schedule active: November to Easter' : 'Winterplan aktiv: November bis Ostern');
    }

    allEvents.forEach(event => {
      const matchesSeason = event.dataset.season === 'all' || event.dataset.season === season;
      const matchesFilter = activeEventFilter === 'all' || event.dataset.eventType === activeEventFilter;
      event.hidden = !matchesSeason || !matchesFilter;
    });
  }

  eventFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      activeEventFilter = filter.dataset.eventFilter || 'all';
      eventFilters.forEach(otherFilter => {
        otherFilter.classList.toggle('is-active', otherFilter === filter);
      });
      updateEvents();
    });
  });

  if (seasonalEvents.length || allEvents.length) {
    updateEvents();
  }

  // --------------------------------------------------------------------------
  // 5. Poster Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll(
    '.section-header, .contact-quick-link, .feature-card, .event-card, .gallery-item'
  );

  revealElements.forEach(element => {
    element.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add('is-visible'));
  }

  // --------------------------------------------------------------------------
  // 6. Sticky Header Shadow on Scroll
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 6. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(forceClose = false) {
    const isCurrentlyOpen = primaryNav.classList.contains('is-open');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      primaryNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Menü schließen');
    } else {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menü öffnen');
    }
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      toggleMenu();
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('is-open')) {
          toggleMenu(true);
        }
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (event) => {
      if (
        primaryNav.classList.contains('is-open') &&
        !primaryNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        toggleMenu(true);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        toggleMenu(true);
        navToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Accessible Accordion FAQ
  // --------------------------------------------------------------------------
  const accordionButtons = document.querySelectorAll('.accordion-header');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const targetId = button.getAttribute('aria-controls');
      const targetCollapse = document.getElementById(targetId);

      if (!targetCollapse) return;

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        targetCollapse.hidden = true;
      } else {
        // Optional: Close other open accordion items
        accordionButtons.forEach(otherBtn => {
          if (otherBtn !== button) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherTarget = document.getElementById(otherBtn.getAttribute('aria-controls'));
            if (otherTarget) otherTarget.hidden = true;
          }
        });

        button.setAttribute('aria-expanded', 'true');
        targetCollapse.hidden = false;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 7. Modals (Impressum & Datenschutz Dialogs)
  // --------------------------------------------------------------------------
  const modalOpenButtons = document.querySelectorAll('[data-open-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      }
    });
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.close === 'function') {
        modal.close();
      }
    });
  });

  // Close modal when clicking on backdrop
  document.querySelectorAll('.modal-dialog').forEach(modal => {
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  });
});
