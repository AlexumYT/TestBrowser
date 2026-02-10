# Custom Browser Project

You now have **two modes**:

1. **Electron app mode** (Chromium desktop app)
2. **Browser-only web mode** (plain HTML/CSS/JS, can be hosted on GitHub Pages)

## 1) Electron app mode

Uses Electron (Chromium under the hood).

### Run
# Custom Browser (Chromium Base)

This project gives you a **custom browser shell** built with:

- **Electron** (uses Chromium under the hood)
- **HTML** for layout
- **CSS** for styling
- **JavaScript** for browser controls

## Features

- Back / Forward / Reload/Stop buttons
- Address bar (accepts URL or search terms)
- Embedded browser tab via `<webview>`
- Loading status indicator

## Run locally

```bash
npm install
npm start
```

Main files:

- `main.js`
- `preload.js`
- `renderer/`

## 2) Browser-only web mode (no app install)

Uses plain HTML/CSS/JS and runs directly in a normal browser.

### Run locally

```bash
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173/web/`

### Host on GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (or your default branch)
   - **Folder:** `/ (root)`
4. Save.
5. Open your published URL and append `/web/`.
   - Example: `https://<username>.github.io/<repo>/web/`

## Important limitation in browser-only mode

Many websites block iframe embedding via `X-Frame-Options`/`CSP`. When that happens, use the **Open in new tab** button.

## Project structure

```text
.
├── main.js
├── preload.js
├── renderer/              # Electron UI
└── web/                   # Plain browser-hostable version
    ├── index.html
    ├── styles.css
    └── app.js
```
├── main.js                # Electron app entry, creates the Chromium window
├── preload.js             # Safe bridge for URL normalization
└── renderer/
    ├── index.html         # Browser UI
    ├── styles.css         # UI styling
    └── renderer.js        # Browser control logic
```

## Notes

- This is a starter browser; add tabs, bookmarks, history, downloads, etc. as next steps.
- Because Electron uses Chromium, this is effectively a Chromium-based custom browser app.
