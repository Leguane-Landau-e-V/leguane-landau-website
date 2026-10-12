# Leguane Landau e.V. – Website Documentation

Herzlichen Glückwunsch! Dies ist die offizielle statische Website für **Leguane Landau e.V.** (`https://leguane-landau.de`).

Die Website ist modern, schnell, mobil-optimiert, barrierearm und kommt **ohne Frameworks, ohne Backend, ohne Cookies und ohne laufende Hosting-Kosten (€0/Monat)** aus.

---

## 📁 Projektübersicht

```text
Website/
├── index.html        # Hauptstruktur, Texte, SEO & Metadaten, Modals
├── style.css         # Modernes CSS-Design, Farbvariablen, Responsive Grid
├── script.js         # Navigation, FAQ-Akkordeon, Formularvalidierung
├── assets/           # Vereinslogos und Scroll-Hintergrundvideo
└── README.md         # Schritt-für-Schritt-Anleitung & Deployment-Guide
```

---

## 1. 🔍 Wo müssen Platzhalter-Texte ersetzt werden?

Alle Stellen, die individuelle Vereinsangaben benötigen, sind im Code mit `[PLATZHALTER]` oder eckigen Klammern gekennzeichnet.

### In [index.html](index.html):
| Suchbegriff / Zeile | Was dort eingetragen werden sollte |
| :--- | :--- |
| `[PLATZHALTER: VEREINS-SLOGAN]` | Euer offizieller Claim oder Slogan (z.B. "Roundnet & Community in Landau"). |
| `[PLATZHALTER: VEREINSBESCHREIBUNG]` | Eine kurze Vorstellung eurer Vereinsgeschichte und Werte. |
| `[TRAININGSORT]` | Euer konkreter Trainingsplatz (z.B. *"Goethepark Landau"* oder Sporthalle mit Adresse). |
| `[ZEIT: ...]`, `[DATUM: ...]` | Eure wöchentlichen Trainingszeiten (z.B. *"Dienstags 18:00 – 20:00 Uhr"*). |
| `[PLATZHALTER: BEITRAGSSÄTZE]` | Höhe eures jährlichen/monatlichen Mitgliedsbeitrags. |
| `[BILD: ...]` | Eigene Fotos (z.B. Bilddatei in einen Ordner `assets/` legen und `<img>` einbinden). |
| `kontakt@leguane-landau.de` | Eure tatsächliche E-Mail-Adresse für Anfragen. |
| `@[DEIN_INSTAGRAM_NAME]` | Euer Instagram-Accountname. |
| `[VOR- UND NACHNAME]`, `[Musterstraße]` | Gesetzliche Pflichtangaben im **Impressum** (Vorstand nach § 26 BGB, Adresse, Registernummer). |

### In [style.css](style.css):
Ganz oben in den `:root`-Variablen kannst du mit einem Klick das Farbschema anpassen:
```css
:root {
  --color-primary: #006D5F;  /* Blue Spruce */
  --color-primary-light: #B5EAE6; /* Icy Aqua */
  --color-accent: #D2FE6D;   /* Lime Cream */
  --color-secondary: #000000;
}
```

Das Video `assets/Background-Animation/Test-Website-BG.mp4` wird beim Scrollen über die gesamte Seitenhöhe gesteuert: Der aktuelle Frame folgt der Scrollposition, statt automatisch abzuspielen. Es ist stumm eingebunden; Nutzer mit aktivierter Einstellung „Bewegung reduzieren“ sehen stattdessen den statischen Farb-Hintergrund.

---

## 2. 💻 Wie teste/öffne ich die Seite lokal in VS Code?

### Option A: Mit der VS Code Erweiterung "Live Server" (Empfohlen)
1. Öffne Visual Studio Code.
2. Gehe links auf das Icon **Erweiterungen** (oder drücke `Strg + Umschalt + X`).
3. Suche nach **Live Server** (von *Ritwick Dey*) und klicke auf **Installieren**.
4. Mache einen Rechtsklick auf [index.html](index.html) und wähle **"Open with Live Server"**.
5. Dein Browser öffnet sich automatisch unter `http://127.0.0.1:5500`. Jede Änderung im Code wird sofort live im Browser aktualisiert!

### Option B: Direkt im Browser öffnen
Mache einfach einen Doppelklick auf die Datei [index.html](index.html) in deinem Dateimanager.

---

## 3. 🐙 Wie lade ich das Projekt auf GitHub hoch?

1. Erstelle ein kostenloses Konto auf [github.com](https://github.com), falls du noch keines hast.
2. Klicke oben rechts auf das **`+`** und wähle **New repository**.
3. Gib als Repository Name z.B. `leguane-landau-website` ein.
4. Wähle **Public** und erstelle das Repository (ohne README-Häkchen, da wir schon eine haben).
5. Öffne das Terminal in VS Code (`Strg + ö` oder Menü: *Terminal > Neues Terminal*) und führe folgende Befehle aus:

```bash
git init
git add .
git commit -m "Initial commit: Leguane Landau Website"
git branch -M main
git remote add origin https://github.com/DEIN-BENUTZERNAME/leguane-landau-website.git
git push -u origin main
```

---

## 4. ⚡ Wie deploye ich die Seite kostenlos auf Cloudflare Pages?

Cloudflare Pages bietet unbegrenzte Bandbreite, weltweites CDN, kostenloses SSL/HTTPS und kostet **0 €**:

1. Erstelle einen kostenlosen Account auf [cloudflare.com](https://cloudflare.com).
2. Klicke im linken Menü auf **Workers & Pages** > **Create application** > Reiter **Pages**.
3. Klicke auf **Connect to Git** und wähle dein GitHub-Repository `leguane-landau-website` aus.
4. **Build-Einstellungen konfigurieren:**
   - **Framework preset:** `None`
   - **Build command:** *(leer lassen)*
   - **Build output directory:** `/` *(oder leer lassen)*
5. Klicke auf **Save and Deploy**.
6. Innerhalb weniger Sekunden ist deine Website unter einer URL wie `leguane-landau-website.pages.dev` weltweit online!

---

## 5. 🌐 Wie verbinde ich `leguane-landau.de` (Namecheap) mit Cloudflare Pages?

Die Domain wird komplett von Cloudflare verwaltet (Nameserver-Methode). Das ist der zuverlässige Weg für die Hauptdomain ohne `www`.

### Schritt 1: Domain zu Cloudflare hinzufügen
1. Im Cloudflare-Dashboard auf [dash.cloudflare.com](https://dash.cloudflare.com) **Add a domain** klicken.
2. `leguane-landau.de` eingeben und den **Free**-Plan wählen.
3. Cloudflare scannt vorhandene DNS-Einträge. Vergleiche sie mit **Namecheap > Advanced DNS** und übernimme nur bewusst angelegte Einträge (z.B. MX/TXT für E-Mail). Namecheap-Parking-Einträge (URL Redirect, `parkingpage.namecheap.com`) **nicht** übernehmen.
4. Cloudflare zeigt dir **zwei Nameserver** an (Muster: `name.ns.cloudflare.com`). Diese sind für jeden Account verschieden.

### Schritt 2: Nameserver bei Namecheap ändern
1. Bei [Namecheap.com](https://www.namecheap.com): **Domain List** > **Manage** neben `leguane-landau.de`.
2. Bei **Nameservers** **Custom DNS** auswählen.
3. Beide Cloudflare-Nameserver eintragen (ohne Leerzeichen oder Punkt am Ende) und mit dem grünen Haken speichern.
4. **DNSSEC** bei Namecheap muss ausgeschaltet sein.
5. In Cloudflare auf **Check nameservers now** klicken. Die Aktivierung dauert meist 1–2 Stunden (maximal 24 Stunden). Du erhältst eine E-Mail, sobald die Domain **Active** ist.

### Schritt 3: Domain mit Cloudflare Pages verbinden
Erst wenn die Domain **Active** ist:
1. **Workers & Pages** > dein Projekt > **Custom domains** > **Set up a custom domain**.
2. `leguane-landau.de` eingeben und **Activate domain** klicken (Cloudflare legt den DNS-Eintrag selbst an).
3. Das Gleiche für `www.leguane-landau.de` wiederholen.
4. Warte, bis beide **Active** zeigen. Das SSL-Zertifikat wird automatisch und kostenlos ausgestellt.

### Schritt 4: Einstellungen prüfen
- **SSL/TLS** > Modus **Full (strict)** (nicht *Flexible*).
- **SSL/TLS** > **Edge Certificates** > **Always Use HTTPS** aktivieren.
- Optional: unter **Rules > Redirect Rules** `www.leguane-landau.de` per 301 auf `https://leguane-landau.de` weiterleiten.
- Für E-Mail-Adressen wie `kontakt@leguane-landau.de` kann **Cloudflare Email Routing** (kostenlos) genutzt werden.

---

## 6. 🚀 Launch-Checkliste

- [ ] **Vereinsdaten geprüft:** Name, Adresse im Impressum und Trainingszeiten vollständig ausgefüllt.
- [ ] **Kontaktkanäle getestet:** E-Mail-Adresse und Instagram-Link funktionieren.
- [ ] **Mobil-Check:** Website auf dem Smartphone aufgerufen (Menü öffnet und schließt sauber).
- [ ] **Formular-Funktion:** Ausfüllen des Formulars erzeugt die Erfolgsmeldung.
- [ ] **Bilder ersetzt:** Eigene Vereinsfotos anstelle der Platzhalter eingebunden.
- [ ] **Rechtliches:** Impressum und Datenschutzerklärung enthalten den korrekten Vereinsvorstand und Sitz.
- [ ] **HTTPS aktiv:** Das grüne Schloss im Browser wird angezeigt.

---

## 7. 🛠️ Empfohlene kostenlose Tools

| Zweck | Empfohlenes Tool | Vorteile / Warum? |
| :--- | :--- | :--- |
| **Mitgliedsanträge & Formulare** | [Tally.so](https://tally.so) | Kostenlos, DSGVO-konform (Server in der EU), modernes Design, kinderleicht per `<iframe>` einbettbar. |
| **Formular-E-Mail-Versand** | [Formspree](https://formspree.io) oder [Web3Forms](https://web3forms.com) | Leitet Absendungen des HTML-Formulars direkt an deine Vereins-E-Mail weiter (ohne eigenen Server). |
| **Event-Anmeldungen** | [Lu.ma](https://lu.ma) oder Tally | Perfekt für Pick-Up Turniere und Sommerfeste mit Teilnehmerliste. |
| **Bilder komprimieren** | [Squoosh.app](https://squoosh.app) oder [TinyPNG](https://tinypng.com) | Verkleinert Fotos vor dem Upload von 5 MB auf 100 KB für blitzschnelle Ladezeiten auf Handys. |
| **Datenschutzfreundliche Statistik** | **Cloudflare Web Analytics** | 100% kostenlos, ohne Cookies, DSGVO-konform, zählt Besucher ohne Consent-Banner. |
