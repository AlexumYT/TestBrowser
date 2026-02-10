const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('browserAPI', {
  normalizeUrl: (value) => {
    const input = (value || '').trim();

    if (!input) {
      return 'https://www.google.com';
    }

    if (/^https?:\/\//i.test(input)) {
      return input;
    }

    if (/^[\w.-]+\.[a-z]{2,}/i.test(input)) {
      return `https://${input}`;
    }

    return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
  }
});
