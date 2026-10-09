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
  --color-primary: #0d9488;  /* Hauptfarbe (z.B. Vereinsgrün oder -blau) */
  --color-accent: #f59e0b;   /* Akzentfarbe (z.B. Ball-Gelb) */
  --color-secondary: #1e293b;/* Dunkle Schrift & Header */
}
```

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

### Schritt 1: Eigene Domain in Cloudflare Pages hinzufügen
1. Gehe in deinem Cloudflare Pages Projekt auf den Reiter **Custom domains**.
2. Klicke auf **Set up a custom domain**.
3. Gib `leguane-landau.de` ein und bestätige.

### Schritt 2: DNS-Einträge bei Namecheap hinterlegen
Melde dich bei [Namecheap.com](https://www.namecheap.com) an:
1. Gehe zu **Domain List** und klicke neben `leguane-landau.de` auf **Manage**.
2. Klicke auf den Reiter **Advanced DNS**.
3. Füge folgende DNS-Records hinzu:
   - **Typ:** `CNAME Record`
   - **Host:** `@`
   - **Value:** `leguane-landau-website.pages.dev`
   - **TTL:** `Automatic` (oder 1 min)
   
   - **Typ:** `CNAME Record`
   - **Host:** `www`
   - **Value:** `leguane-landau-website.pages.dev`
   - **TTL:** `Automatic`
4. *Hinweis:* Wenn Namecheap keinen CNAME auf `@` (Root Domain) erlaubt, nutze den `ALIAS` oder `ANAME` Record oder ändere die Nameserver direkt auf Cloudflare DNS (empfohlen für volle Cloudflare-Sicherheitsfeatures).
5. Das SSL-Zertifikat wird von Cloudflare automatisch und kostenlos ausgestellt.

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
