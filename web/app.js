const HOME_URL = 'https://example.com';

const frame = document.getElementById('pageFrame');
const addressBar = document.getElementById('addressBar');
const addressForm = document.getElementById('addressForm');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const homeBtn = document.getElementById('homeBtn');
const newTabBtn = document.getElementById('newTabBtn');
const retryMirrorBtn = document.getElementById('retryMirrorBtn');
const renderMode = document.getElementById('renderMode');
const frameNote = document.getElementById('frameNote');
const status = document.getElementById('status');

let historyStack = [HOME_URL];
let historyIndex = 0;
let currentOriginalUrl = HOME_URL;
let loadToken = 0;

function normalizeUrl(value) {
  const input = (value || '').trim();
  if (!input) return HOME_URL;

  if (/^https?:\/\//i.test(input)) return input;
  if (/^[\w.-]+\.[a-z]{2,}/i.test(input)) return `https://${input}`;

  return `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
}

function toMirrorUrl(url) {
  return `https://r.jina.ai/http://${url.replace(/^https?:\/\//i, '')}`;
}

function canGoBack() {
  return historyIndex > 0;
}

function canGoForward() {
  return historyIndex < historyStack.length - 1;
}

function updateButtons() {
  backBtn.disabled = !canGoBack();
  forwardBtn.disabled = !canGoForward();
}

function setStatus(message) {
  status.textContent = message;
}

function setNote(message) {
  frameNote.textContent = message;
}

function loadIntoFrame(url, mode = 'iframe') {
  loadToken += 1;
  const activeToken = loadToken;

  if (mode === 'mirror') {
    frame.src = toMirrorUrl(url);
    setStatus('Mirror mode: loading readable copy…');
    setNote('Mirror mode uses r.jina.ai to load a readable version when iframe embedding is blocked.');
    return;
  }

  frame.src = url;
  setStatus('Loading in iframe…');
  setNote('If a site blocks iframe loading, Auto mode will switch to mirror mode.');

  window.setTimeout(() => {
    if (activeToken !== loadToken) return;

    if (renderMode.value === 'auto') {
      frame.src = toMirrorUrl(url);
      setStatus('Iframe likely blocked; switched to mirror mode.');
      setNote('This site likely blocked iframe embedding (X-Frame-Options/CSP), so mirror mode was used.');
    } else {
      setStatus('If page did not load, try "Retry with mirror" or "Open original in new tab".');
    }
  }, IFRAME_TIMEOUT_MS);
}

function render(url) {
  currentOriginalUrl = url;
  addressBar.value = url;

  if (renderMode.value === 'mirror') {
    loadIntoFrame(url, 'mirror');
  } else {
    loadIntoFrame(url, 'iframe');
  }
function render(url) {
  addressBar.value = url;
  frame.src = url;
  status.textContent = 'Loading…';

  // In browser-only mode we cannot inspect iframe failures reliably cross-origin.
  setTimeout(() => {
    status.textContent = 'Loaded (or blocked by site policy)';
  }, 900);

  updateButtons();
}

function navigate(rawInput) {
  const url = normalizeUrl(rawInput);

  historyStack = historyStack.slice(0, historyIndex + 1);
  historyStack.push(url);
  historyIndex += 1;

  render(url);
}

addressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  navigate(addressBar.value);
});

renderMode.addEventListener('change', () => {
  render(historyStack[historyIndex]);
});

backBtn.addEventListener('click', () => {
  if (!canGoBack()) return;
  historyIndex -= 1;
  render(historyStack[historyIndex]);
});

forwardBtn.addEventListener('click', () => {
  if (!canGoForward()) return;
  historyIndex += 1;
  render(historyStack[historyIndex]);
});

homeBtn.addEventListener('click', () => {
  navigate(HOME_URL);
});

newTabBtn.addEventListener('click', () => {
  const target = normalizeUrl(addressBar.value || currentOriginalUrl);
  window.open(target, '_blank', 'noopener,noreferrer');
});

retryMirrorBtn.addEventListener('click', () => {
  loadIntoFrame(currentOriginalUrl, 'mirror');
});

  const target = normalizeUrl(addressBar.value || historyStack[historyIndex]);
  window.open(target, '_blank', 'noopener,noreferrer');
});

render(HOME_URL);
