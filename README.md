# Mehtab Mahir — Portfolio

Personal portfolio at [mehtab.work](https://mehtab.work), built with static HTML, CSS, and JavaScript. Hosted on Netlify with Functions and Blobs for resume uploads.

## Local Development

Requires Node.js 22.13 or newer.

```sh
npm install
npm run build
npm run dev
```

Run `npm test` for the build and resume API checks.

## Deployment

Import the repository into Netlify. Build settings are included in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions`

## Updating the Resume

1. Run `npm run password` and save the generated password.
2. Add the generated hash to Netlify as `RESUME_PASSWORD_HASH`, with the Functions scope enabled, then redeploy.
3. Open `/admin/`, enter the password, and upload a PDF up to 4 MB.

Uploads replace the public resume immediately and persist across deployments on the same Netlify site. Until the first upload, the site serves `netlify/initial-resume.pdf`.

To change the password, generate a new one, update the environment variable, and redeploy. Keep passwords and hashes out of the repository. For local uploads, use a separate test hash in an ignored `.env` file.

## Editing the Site

- `scripts/build.mjs`: page templates, experience, and contact details.
- `src/projects.mjs`: project content.
- `public/`: styles, browser scripts, fonts, and images.
- `netlify/`: resume API and storage logic.
