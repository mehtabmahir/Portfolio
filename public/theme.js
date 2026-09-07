// Resolve the saved preference before the page is painted.
(() => {
  let preference = 'auto';
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (['auto', 'light', 'dark'].includes(saved)) preference = saved;
  } catch {}
  const theme = preference === 'auto'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : preference;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#efeeec' : '#101113';
})();
