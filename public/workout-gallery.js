// Cycles the Workout Counter showcase through its three screens on click.
(() => {
  const viewer = document.querySelector('[data-wc-viewer]');
  if (!viewer) return;

  const slides = [...viewer.querySelectorAll('img')];
  const title = document.querySelector('[data-caption-title]');
  const note = document.querySelector('[data-caption-note]');
  const dots = [...document.querySelectorAll('[data-wc-dot]')];
  if (!slides.length || !title || !note) return;

  let index = Math.max(0, slides.findIndex(slide => !slide.hidden));

  const render = () => {
    slides.forEach((slide, i) => { slide.hidden = i !== index; });
    const active = slides[index];
    title.textContent = active.dataset.title;
    note.textContent = active.dataset.note;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    const next = slides[(index + 1) % slides.length];
    viewer.setAttribute('aria-label', `Show next screen: ${next.dataset.title}`);
  };

  viewer.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    render();
  });

  render();
})();
