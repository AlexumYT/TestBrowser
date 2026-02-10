const HOME_URL = 'https://example.com';

const frame = document.getElementById('pageFrame');
const addressBar = document.getElementById('addressBar');
const addressForm = document.getElementById('addressForm');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const homeBtn = document.getElementById('homeBtn');
const newTabBtn = document.getElementById('newTabBtn');
const status = document.getElementById('status');

let historyStack = [HOME_URL];
let historyIndex = 0;

function normalizeUrl(value) {
  const input = (value || '').trim();
  if (!input) return HOME_URL;

  if (/^https?:\/\//i.test(input)) return input;
  if (/^[\w.-]+\.[a-z]{2,}/i.test(input)) return `https://${input}`;

  return `https://duckduckgo.com/?q=${encodeURIComponent(input)}`;
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
  const target = normalizeUrl(addressBar.value || historyStack[historyIndex]);
  window.open(target, '_blank', 'noopener,noreferrer');
});

render(HOME_URL);
