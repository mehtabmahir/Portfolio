# Portfolio Maintenance Context

## Preferences

- Use direct, factual wording; avoid slogans and corporate phrasing.
- Use Title Case for headings and role labels, including the footer.
- Use plain-language commit titles summarizing all changes, with details in the body. No fix:/feat: prefixes.
- Keep the neutral dark theme, circular portrait, small social icons, and compact rounded buttons.
- No Unicode arrow symbols: iOS can render them as emoji.
- The portrait links to LinkedIn and appears below the Software Engineer heading on mobile.
- The label above the name is Malverne, NY, without a status dot.
- Degree details belong directly under Experience, before the six jobs, without a separate Education heading or card.
- Degree label: Queens College, NY. Dates: Jan 2023 - Dec 2025.
- Keep the six existing work roles; exclude Uber. Omit the Handshake project name and Contract/Remote from LinkedIn.
- Use the latest resume details, retaining relevant earlier specifics without duplicate bullets. Preserve the uploaded PDF itself.

## Resume Hosting

- Deploy through Git integration or a CLI deploy that includes Functions; uploading dist alone is insufficient.
- RESUME_PASSWORD_HASH must include Functions scope. Redeploy after changing it.
- Netlify Blobs uses the site-wide portfolio-resume store, current.pdf key, with strong consistency.
- Uploads persist on the same site; a new Netlify site has separate storage. Preview deploys on the same site share the store, so restrict the password hash to production if previews should not accept uploads.
- initial-resume.pdf is bundled in the function as a fallback before the first upload. Storage failures return an error rather than silently serving an outdated fallback.
- Same-origin upload checks, salted scrypt password verification, 4 MB limit, PDF parsing, and encrypted-PDF rejection are implemented.
- Public reads use no-store. PDF responses permit same-origin embedding for the resume preview.
- Rate limits are enforced by Netlify and need a production check. Local uploads use separate storage and test credentials.

## Reference Notes

The accompanying files preserve original project sources, reasoning behind factual qualifications, and historical checks. They are dated snapshots, not proof of current deployment status. The original redesign plan describes an earlier proposal; current source and the preferences above take precedence.

These maintenance notes are kept in the repository so project context is available on other computers and in future work.
