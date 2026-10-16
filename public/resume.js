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
let TextLayer;

// Debounce layout changes; only the latest render may replace the preview.
function scheduleRender() {
  const version = ++revision;
  clearTimeout(pending);
  pending = setTimeout(() => render(version).catch(error => {
    if (version === revision) showError(error);
  }), 100);
}
function showError(error) {
  console.error('Unable to render resume preview:', error);
  state.textContent = 'The preview is unavailable. You can still open or download the PDF above.';
}
async function render(version) {
  const width = preview.clientWidth - 24;
  const height = preview.clientHeight - 24;
  const sheets = document.createDocumentFragment();
  // CSS zoom is not included in devicePixelRatio. Render for the actual displayed
  // size, including browser pinch zoom, rather than stretching a smaller bitmap.
  const layoutScale = preview.getBoundingClientRect().width / preview.offsetWidth;
  const displayScale = (window.devicePixelRatio || 1) * layoutScale * (window.visualViewport?.scale || 1);
  for (const [index, page] of pdfPages.entries()) {
    if (version !== revision) return;
    const original = page.getViewport({scale: 1});
    const fit = Math.min(width / original.width, height / original.height);
    const viewport = page.getViewport({scale: fit * zoom});
    const sheet = document.createElement('div');
    sheet.className = 'resume-sheet';
    sheet.setAttribute('role', 'group');
    sheet.setAttribute('aria-label', `Resume page ${index + 1}`);
    sheet.style.setProperty('--total-scale-factor', viewport.scale);
    sheet.style.setProperty('--scale-round-x', '1px');
    sheet.style.setProperty('--scale-round-y', '1px');
    sheet.style.width = `${viewport.width}px`;
    sheet.style.height = `${viewport.height}px`;
    const canvas = document.createElement('canvas');
    // Keep unusually large pages within browser canvas/memory limits.
    const ratio = Math.min(displayScale, 8192 / Math.max(viewport.width, viewport.height), Math.sqrt(16_000_000 / (viewport.width * viewport.height)));
    canvas.width = Math.ceil(viewport.width * ratio);
    canvas.height = Math.ceil(viewport.height * ratio);
    canvas.style.width = `${viewport.width}px`;
    canvas.style.height = `${viewport.height}px`;
    const text = await page.getTextContent();
    canvas.setAttribute('aria-hidden', 'true');
    sheet.append(canvas);
    await page.render({canvasContext: canvas.getContext('2d'), viewport, transform: [ratio, 0, 0, ratio, 0, 0]}).promise;
    const textLayer = document.createElement('div');
    textLayer.className = 'resume-text';
    sheet.append(textLayer);
    await new TextLayer({textContentSource: text, container: textLayer, viewport}).render();
    // PDF annotation rectangles use PDF coordinates; convert using the same
    // viewport as the text and canvas so links track rotation, fitting and zoom.
    for (const annotation of await page.getAnnotations({intent: 'display'})) {
      if (annotation.subtype !== 'Link' || !annotation.url) continue;
      let url;
      try { url = new URL(annotation.url); } catch { continue; }
      if (!['https:', 'http:', 'mailto:', 'tel:'].includes(url.protocol)) continue;
      const [x1, y1] = viewport.convertToViewportPoint(annotation.rect[0], annotation.rect[1]);
      const [x2, y2] = viewport.convertToViewportPoint(annotation.rect[2], annotation.rect[3]);
      const link = document.createElement('a');
      link.className = 'resume-pdf-link';
      link.href = url.href;
      link.setAttribute('aria-label', annotation.titleObj?.str || url.href);
      link.title = url.href;
      if (['https:', 'http:'].includes(url.protocol)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      Object.assign(link.style, {left: `${Math.min(x1, x2)}px`, top: `${Math.min(y1, y2)}px`, width: `${Math.abs(x2 - x1)}px`, height: `${Math.abs(y2 - y1)}px`});
      sheet.append(link);
    }
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
  const pdfjs = await import('/vendor/pdfjs/pdf.mjs');
  const {getDocument, GlobalWorkerOptions} = pdfjs;
  TextLayer = pdfjs.TextLayer;
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
  window.addEventListener('resize', scheduleRender);
  window.visualViewport?.addEventListener('resize', scheduleRender);
  // Moving between monitors can change pixel density without resizing the page.
  function watchDensity() {
    matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener('change', () => {
      scheduleRender();
      watchDensity();
    }, {once: true});
  }
  watchDensity();
  scheduleRender();
}
load().catch(showError);
