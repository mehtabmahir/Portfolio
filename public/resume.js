const state = document.querySelector('#resume-state');
const preview = document.querySelector('#resume-preview');
const pages = document.querySelector('#resume-pages');
const toolbar = document.querySelector('#resume-toolbar');
const zoomLabel = document.querySelector('#resume-zoom');
const zoomIn = document.querySelector('#resume-zoom-in');
const zoomOut = document.querySelector('#resume-zoom-out');
let zoom = 1;
let revision = 0;
let pdfPages = [];
let pending;

// Debounce layout changes; only the latest render may replace the preview.
function scheduleRender() {
  const version = ++revision;
  clearTimeout(pending);
  pending = setTimeout(() => render(version).catch(() => {
    if (version === revision) showError();
  }), 100);
}
function showError() {
  state.textContent = 'The preview is unavailable. You can still open or download the PDF above.';
}
async function render(version) {
  const width = preview.clientWidth - 24;
  const height = preview.clientHeight - 24;
  const sheets = document.createDocumentFragment();
  for (const [index, page] of pdfPages.entries()) {
    if (version !== revision) return;
    const original = page.getViewport({scale: 1});
    const fit = Math.min(width / original.width, height / original.height);
    const viewport = page.getViewport({scale: fit * zoom});
    const sheet = document.createElement('div');
    sheet.className = 'resume-sheet';
    sheet.style.width = `${viewport.width}px`;
    sheet.style.height = `${viewport.height}px`;
    const canvas = document.createElement('canvas');
    // Bound backing-store memory at high zoom on mobile devices.
    const ratio = Math.min(window.devicePixelRatio || 1, 2, 4096 / Math.max(viewport.width, viewport.height));
    canvas.width = Math.ceil(viewport.width * ratio);
    canvas.height = Math.ceil(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const text = await page.getTextContent();
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', `Resume page ${index + 1}: ${text.items.map(item => item.str).join(' ')}`);
    sheet.append(canvas);
    await page.render({canvasContext: canvas.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0]}).promise;
    sheets.append(sheet);
  }
  if (version !== revision) return;
  pages.replaceChildren(sheets);
  zoomLabel.value = `${Math.round(zoom * 100)}%`;
  zoomIn.disabled = zoom >= 3;
  zoomOut.disabled = zoom <= 0.5;
  state.textContent = '';
}
function setZoom(value) {
  zoom = Math.max(0.5, Math.min(3, value));
  scheduleRender();
}
zoomIn.addEventListener('click', () => setZoom(zoom + 0.25));
zoomOut.addEventListener('click', () => setZoom(zoom - 0.25));
document.querySelector('#resume-fit').addEventListener('click', () => {
  zoom = 1;
  preview.scrollTo(0, 0);
  scheduleRender();
});

async function load() {
  const response = await fetch('/api/resume', {cache: 'no-store'});
  if (response.status === 404) {
    state.textContent = 'My resume isn’t available here yet. Please email me for a copy.';
    return;
  }
  if (!response.ok) throw new Error('Resume unavailable');
  const {getDocument, GlobalWorkerOptions} = await import('/vendor/pdfjs/pdf.mjs');
  GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.mjs';
  const pdf = await getDocument({
    data: new Uint8Array(await response.arrayBuffer()),
    cMapUrl: '/vendor/pdfjs/cmaps/', cMapPacked: true,
    standardFontDataUrl: '/vendor/pdfjs/standard_fonts/',
    wasmUrl: '/vendor/pdfjs/wasm/', isEvalSupported: false,
  }).promise;
  for (let number = 1; number <= pdf.numPages; number++) pdfPages.push(await pdf.getPage(number));
  preview.hidden = false;
  toolbar.hidden = false;
  new ResizeObserver(scheduleRender).observe(preview);
  scheduleRender();
}
load().catch(showError);
