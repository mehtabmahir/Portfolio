// Native anchor navigation remains available without JavaScript.
document.querySelectorAll('a[href^="/#"]').forEach(link => {
  if (location.pathname === '/') link.setAttribute('href', link.getAttribute('href').slice(1));
});

const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  let preference = document.documentElement.dataset.themePreference || 'auto';
  const updateTheme = value => {
    preference = ['auto', 'light', 'dark'].includes(value) ? value : 'auto';
    const theme = preference === 'auto' ? (systemTheme.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.theme = theme;
    const modes = ['auto', 'light', 'dark'];
    const next = modes[(modes.indexOf(preference) + 1) % modes.length];
    const titleCase = value => value[0].toUpperCase() + value.slice(1);
    const label = `Theme: ${titleCase(preference)}. Switch to ${titleCase(next)}`;
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#efeeec' : '#101113';
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
