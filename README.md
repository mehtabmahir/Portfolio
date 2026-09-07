# Mehtab Mahir — portfolio

A responsive static portfolio with seven project pages, current experience, and a password-protected resume uploader. Built for Netlify Functions and Netlify Blobs. The original live site is untouched.

## Deploy on Netlify

1. Import this repository into Netlify. Use Node 22 or newer.
2. The included `netlify.toml` sets the build command to `npm run build`, publish directory to `dist`, and functions directory to `netlify/functions`.
3. Deploy. The supplied August 27, 2026 PDF is bundled with the resume function and is served until the first successful upload.
4. On your own computer, run `npm run password`. Save the generated password in your password manager. Copy the generated hash into a Netlify environment variable named `RESUME_PASSWORD_HASH`. Its scope must include **Functions** (or all scopes). Never add the password or hash to repository files.
5. Deploy again once after setting the environment variable so the function receives it.
6. Visit `https://YOUR-SITE/admin/`, select a PDF up to 4 MB, enter the password, and choose **Upload & replace resume**. This publishes the PDF immediately, with no repository update or rebuild.
7. Check the Netlify deploy log’s post-processing section for the applied resume-upload rate limit. Then verify the live upload, `/resume/`, and download links. Netlify rate limiting is platform-enforced and cannot be fully verified in local development.

Use Git import or a Netlify CLI deployment that bundles functions. Dragging only `dist` into Netlify Drop does **not** install the server functions or persistent resume storage.

## Resume behavior

- `/resume/`: public landing page with view and download actions.
- `/api/resume`: latest PDF; `?download=1` forces a download.
- `/admin/`: upload form. The page itself is public but excluded from indexing; every upload is authenticated on the server.
- Netlify Blobs uses the site-wide `portfolio-resume` store, key `current.pdf`, with strong consistency. Uploads survive normal redeploys on the same Netlify site. Creating a different Netlify site creates separate storage.
- Preview deployments on the same site share this store. Set the password hash only in the production deploy context if previews should not accept uploads.
- The supplied PDF is kept unchanged in `netlify/initial-resume.pdf`. It is bundled privately with the function, not exposed as an old static download after replacement. It is still in the source repository; a public repository makes its files public.
- Passwords are checked against a salted scrypt hash using a timing-safe comparison. Passwords are not stored in the browser, URLs, or logs. The form clears the password after each attempt.
- Uploads enforce same-origin requests, a 4 MB limit, PDF signature and parser validation, and reject encrypted PDFs. PDF validation is not a malware scanner. Use PDFs you trust.
- Five upload requests per IP and domain per three minutes are configured. The platform may allow a small overage while rate counters update.
- Reads use `no-store` to avoid serving a cached old resume. A failed storage read produces a temporary error rather than silently serving the initial PDF.
- To rotate the password, run the password helper again, replace the environment hash, and redeploy. No repository edit is needed.

## Local development

```sh
npm install
npm run build
npm test
npm run dev
```

Netlify Dev serves the site and emulates functions and Blobs. For local uploads, generate a test password and put its hash into an ignored `.env` file. Local storage is separate from production. Do not put production secrets into automated tests.

## Editing

Writing preference: use title case for headings and normal sentence case for paragraphs. Use direct, factual first-person language. Lead with Mehtab's name, role, education, and specific work. Use actual project names and straightforward labels such as Projects, Experience, Resume, and Connect. Avoid slogans, corporate language, and invented marketing names. Wording references reviewed September 7, 2026: [Jonathan Wu](https://jonathanw.dev/) and [Savvy Raghuvanshi](https://savvy.bio/). These informed the tone; no affiliation or borrowed credentials are implied.

- `src/projects.mjs`: project descriptions and case-study content.
- `scripts/build.mjs`: page templates, experience and contact details.
- `public/styles.css`: responsive visual design.
- `netlify/lib/resume.mjs`: tested upload/read logic.
- `reference/`: captured original public page and link configuration for reference; not a standalone functional clone and not included in the deployed site.

Content incorporates the supplied August 27, 2026 resume. The original six projects are preserved; Workout Counter is added. EasyWhisperUI’s 500+ star milestone and Linux support were checked against its public repository on September 7, 2026. Project source links were taken from the original site and latest resume. No current availability claim is made.

Deployment notes: https://docs.netlify.com/build/data-and-storage/netlify-blobs/ and https://docs.netlify.com/build/functions/environment-variables/.
