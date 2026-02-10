const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const addressForm = document.getElementById('addressForm');
const addressBar = document.getElementById('addressBar');
const status = document.getElementById('status');
const webview = document.getElementById('browserView');

function updateNavButtons() {
  backBtn.disabled = !webview.canGoBack();
  forwardBtn.disabled = !webview.canGoForward();
}

function load(value) {
  const target = window.browserAPI.normalizeUrl(value);
  webview.loadURL(target);
}

backBtn.addEventListener('click', () => {
  if (webview.canGoBack()) {
    webview.goBack();
  }
});

forwardBtn.addEventListener('click', () => {
  if (webview.canGoForward()) {
    webview.goForward();
  }
});

reloadBtn.addEventListener('click', () => {
  if (webview.isLoading()) {
    webview.stop();
  } else {
    webview.reload();
  }
});

addressForm.addEventListener('submit', (event) => {
  event.preventDefault();
  load(addressBar.value);
});

webview.addEventListener('did-start-loading', () => {
  status.textContent = 'Loading…';
  reloadBtn.textContent = '✕';
  reloadBtn.title = 'Stop loading';
});

webview.addEventListener('did-stop-loading', () => {
  status.textContent = 'Ready';
  reloadBtn.textContent = '⟳';
  reloadBtn.title = 'Reload page';
  updateNavButtons();
});

webview.addEventListener('did-finish-load', () => {
  addressBar.value = webview.getURL();
  updateNavButtons();
});

webview.addEventListener('did-fail-load', (event) => {
  status.textContent = `Failed (${event.errorCode})`;
});

webview.addEventListener('page-title-updated', (event) => {
  document.title = `${event.title} • Custom Chromium Browser`;
});

updateNavButtons();
