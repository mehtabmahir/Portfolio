// Native anchor navigation remains available without JavaScript.
document.querySelectorAll('a[href^="/#"]').forEach(link => {
  if (location.pathname === '/') link.setAttribute('href', link.getAttribute('href').slice(1));
});
