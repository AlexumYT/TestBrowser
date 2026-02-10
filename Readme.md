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

## Project structure

```text
.
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
