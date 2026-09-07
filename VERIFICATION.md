# Verification — September 7, 2026

- Static build passed: homepage, seven project pages, resume page, admin page, and 404 page.
- Six automated test groups passed, including internal links/assets, current resume content, password rejection, origin rejection, method restrictions, PDF validation (including an encrypted fixture), size limits, replacement, fallback, HEAD/download behavior, and controlled storage errors.
- Netlify Dev loaded both functions. The initial PDF response matched the supplied PDF's SHA-256 hash exactly.
- An authenticated local upload succeeded through both the HTTP endpoint and the browser form. The browser showed the success message and cleared the password. The public resume endpoint served the saved PDF.
- Browser checks: homepage, resume page, and admin page; no observed console errors or broken homepage images. Responsive measurements showed no horizontal overflow at CSS viewport widths 360, 390, 768, 1280, and 1440. After increasing supporting text sizes, the 360px layout was checked again.
- Netlify's function packager generated both API v2 function bundles, recognized the custom routes and rate-limit configuration, and included `netlify/initial-resume.pdf` in the resume bundle.
- Production dependency audit: zero reported vulnerabilities. The current Netlify CLI development dependency has 17 reported transitive/direct advisories (14 high, 2 moderate, 1 low). These development packages are not shipped as runtime dependencies. The audit's proposed CLI downgrade was not applied. Review upstream CLI updates before future development work; do not expose Netlify Dev as a public service.

Still deployment-dependent: actual Netlify deployment, Functions environment-variable configuration, platform rate-limit enforcement, custom domain and HTTPS settings, and a final live resume upload check. No Netlify account was connected and no live site or DNS settings were changed. Full automated accessibility and performance scoring were not run.

The development password used during testing is not a production credential. Generate a fresh private password using the README instructions.
