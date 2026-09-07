// Native anchor navigation remains available without JavaScript.
document.querySelectorAll('a[href^="/#"]').forEach(link => {
  if (location.pathname === '/') link.setAttribute('href', link.getAttribute('href').slice(1));
});

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let preference = document.documentElement.dataset.themePreference || 'auto';
  let themeTransition;
  let themeRequest = 0;
  const backgrounds = new Map(['light', 'dark'].map(mode => {
    const image = new Image();
    image.src = `/assets/landscape-${mode}.png`;
    return [mode, image.decode().catch(() => {})];
  }));
  const showTheme = async theme => {
    const request = ++themeRequest;
    await backgrounds.get(theme);
    if (request !== themeRequest) return;
    themeTransition?.skipTransition();
    if (document.documentElement.dataset.theme === theme) return;
    const apply = () => {
      if (request !== themeRequest) return;
      document.documentElement.dataset.theme = theme;
      document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#efeeec' : '#101113';
    };
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      themeTransition = document.startViewTransition(apply);
      themeTransition.ready.catch(() => {});
    } else {
      apply();
    }
  };
  const updateTheme = value => {
    preference = ['auto', 'light', 'dark'].includes(value) ? value : 'auto';
    const theme = preference === 'auto' ? (systemTheme.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.themePreference = preference;
    showTheme(theme);
    const modes = ['auto', 'light', 'dark'];
    const next = modes[(modes.indexOf(preference) + 1) % modes.length];
    const titleCase = value => value[0].toUpperCase() + value.slice(1);
    const label = `Theme: ${titleCase(preference)}. Switch to ${titleCase(next)}`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  };
  updateTheme(preference);
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    const modes = ['auto', 'light', 'dark'];
    updateTheme(modes[(modes.indexOf(preference) + 1) % modes.length]);
    try { localStorage.setItem('portfolio-theme', preference); } catch {}
  });
  systemTheme.addEventListener('change', () => {
    if (preference === 'auto') updateTheme('auto');
  });
  window.addEventListener('storage', event => {
    if (event.key === 'portfolio-theme' || event.key === null) updateTheme(event.newValue);
  });
}
