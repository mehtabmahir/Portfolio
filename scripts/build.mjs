import { whisperPage } from './whisper-page.mjs';
import { workoutPage } from './workout-page.mjs';
import { mkdir, cp, writeFile } from 'node:fs/promises';
import { projects } from '../src/projects.mjs';

const email = 'mehtab.mahir@gmail.com';
const site = 'https://mehtab.work';
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const tags = p => `<ul class="tags" aria-label="Technologies">${p.tags.map(t=>`<li>${t}</li>`).join('')}</ul>`;
const bySlug = slug => projects.find(p => p.slug === slug);
const githubIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.29 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"/></svg>';
const linkedinIcon = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z"/></svg>';

const header = `<a class="skip" href="#main">Skip to content</a><header class="header wrap"><div class="header-identity"><a href="/" class="home-button" aria-label="Home" title="Home"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg></a><a href="/" class="brand" aria-label="Mehtab Mahir home"><span class="brand-name">MEHTAB MAHIR</span></a></div><nav aria-label="Main navigation"><a href="/#work">Work</a><a href="/#projects">Projects</a><a href="/#about">About</a><a href="/resume/">Resume</a><a class="nav-contact" href="/#contact">Connect</a><button class="theme-toggle" type="button" aria-label="Theme: Auto. Switch to Light" title="Theme: Auto. Switch to Light" hidden><svg class="auto-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="6"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l1.5 1.5m13 13L20 20M4 20l1.5-1.5m13-13L20 4m-10 11 2-6 2 6m-3.3-2h2.6"/></svg><svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg><svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"/></svg></button></nav></header>`;
const footer = `<footer class="wrap footer"><a href="/" class="footer-name">Mehtab Mahir<span>Software Engineer · New York</span></a><span class="copyright">© ${new Date().getFullYear()} Mehtab Mahir</span></footer>`;
const page = (title,description,body,path='/',admin=false,extraHead='') => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="author" content="Mehtab Mahir"><meta name="theme-color" content="#101113">${admin?'<meta name="robots" content="noindex,nofollow">':`<link rel="canonical" href="${site}${path}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:url" content="${site}${path}"><meta property="og:site_name" content="Mehtab Mahir"><meta property="og:image" content="${site}/assets/og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Mehtab Mahir, software engineer"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${site}/assets/og.jpg">`}${extraHead}<link rel="icon" href="/favicon.svg" type="image/svg+xml"><script src="/theme.js"></script><link rel="stylesheet" href="/styles.css"><script src="/site.js" defer></script></head><body>${header}${body}${footer}</body></html>`;

const feature = bySlug('easy-whisper-ui');
const workout = bySlug('workout-counter');
const auto60 = bySlug('auto-60hz');
const telemedicine = bySlug('telemedicine');
const database = bySlug('database-normalization');
const gemini = bySlug('gemini-chatbot');
const snake = bySlug('learning-snake');

const cardLink = (p, extra='') => `<article class="project-card${extra}"><a class="project-image ${p.slug === 'auto-60hz' ? 'refresh-visual' : 'care-visual'}" href="/projects/${p.slug}/" aria-label="${p.title} project details"><img src="/assets/${p.image}" alt="${p.title} application interface" width="700" height="400" loading="lazy"></a><p class="eyebrow">${p.category}</p><h3><a class="card-link" href="/projects/${p.slug}/">${p.title}</a></h3><p>${p.description}</p>${tags(p)}</article>`;
const smallCard = p => `<article class="small-project"><p class="eyebrow">${p.category}</p><h3><a class="card-link" href="/projects/${p.slug}/">${p.title}</a></h3><p>${p.description}</p>${tags(p)}</article>`;

const experience = `<section id="work" class="experience wrap"><div class="section-heading"><div><p class="eyebrow">02 / EXPERIENCE</p><h2>Experience</h2></div></div>${[
 ['May 2026 – Present','Software Engineering AI Trainer','Mercor',[
  'Review and test AI-generated Python code, identify errors, and write corrected solutions.',
  'Evaluate model responses for correctness, clarity, and instruction adherence using structured rubrics.',
  'Compare multiple model responses and document detailed evaluation justifications.'
 ]],
 ['Aug 2026 – Oct 2026','AI Trainer','Handshake / LinkedIn AI Training Program',[
  'Develop long-context prompts and evaluate multi-turn AI interactions.',
  'Annotate speech and non-speech audio in video clips for multimodal AI training.'
 ]],
 ['Mar 2026 – May 2026','Payment Analyst','Amalgamated Employee Benefits Administrators',[
  'Manage pension and benefit payment workflows, including calculations, withholding, and audit records.',
  'Investigate Salesforce inquiries and resolve payment discrepancies.'
 ]],
 ['Jul 2024 – Aug 2024','Full Stack Developer Intern','Research Foundation of CUNY',[
  'Led development of a multimodal React chatbot using the Gemini API.',
  'Integrated Google Cloud Speech-to-Text and Text-to-Speech.',
  'Integrated Python functionality into the Node.js application.'
 ]]
].map(([date,role,company,bullets])=>`<article class="experience-row"><time>${date}</time><h3>${role}<span>${company}</span></h3><ul class="experience-bullets">${bullets.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></article>`).join('')}</section>`;

const education = `<section id="education" class="education-section wrap"><div class="section-heading"><div><p class="eyebrow">03 / EDUCATION &amp; SKILLS</p><h2>Education &amp; Skills</h2></div></div><div class="education-grid"><article class="education-card"><p class="eyebrow">EDUCATION</p><h3>Bachelor’s Degree in Computer Science</h3><p class="education-school">Queens College, City University of New York</p><p class="education-meta">January 2023 – December 2025</p><p class="education-note">Treasurer, Crypto Research QC</p></article><div class="skill-groups">${[
 ['Languages',['TypeScript','JavaScript','Python','C++','Swift','PowerShell','SQL (T-SQL)']],
 ['Frameworks & Libraries',['React','Electron','Qt','SwiftUI','AVFoundation','Apple Vision']],
 ['Tools & Platforms',['Node.js','Git','FFmpeg','whisper.cpp','llama.cpp','Google Cloud','Gemini API','SQL Server']]
].map(([group,items])=>`<section class="skill-group"><h3>${group}</h3><ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul></section>`).join('')}</div></div></section>`;

const home = `<main id="main"><section class="hero wrap"><div class="hero-copy"><p class="eyebrow">NEW YORK</p><h1>Mehtab Mahir<span class="hero-role">Software Engineer</span></h1><a class="portrait-block" href="https://www.linkedin.com/in/mehtabmahir/" aria-label="Visit Mehtab Mahir on LinkedIn"><div class="portrait-frame"><img src="/assets/profile.jpg" width="400" height="480" alt="Mehtab Mahir by the water" fetchpriority="high"></div></a><p class="hero-description">I enjoy building practical software that people can use every day. My work spans desktop and mobile applications, including AI-powered tools that run locally.</p><div class="hero-links"><div class="hero-social-actions"><a class="social-icon" href="https://www.linkedin.com/in/mehtabmahir/" aria-label="LinkedIn" title="LinkedIn">${linkedinIcon}</a><a class="social-icon" href="https://github.com/mehtabmahir" aria-label="GitHub" title="GitHub">${githubIcon}</a><a class="social-icon" href="mailto:${email}" aria-label="Email" title="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg></a></div><div class="hero-actions"><a class="button primary" href="#projects">Projects</a><a class="button primary" href="/resume/">Resume</a></div></div></div></section>
<section id="projects" class="work wrap"><div class="section-heading"><div><p class="eyebrow">01 / PROJECTS</p><h2>Projects</h2></div></div>
<article class="featured"><div class="featured-copy"><p class="eyebrow lavender">FEATURED PROJECT · 588 GITHUB STARS</p><h3>${feature.title}</h3><p class="feature-summary">${feature.summary}</p><p>${feature.description}</p><dl class="feature-stats"><div><dt>Stars</dt><dd>588</dd></div><div><dt>Forks</dt><dd>37</dd></div><div><dt>Latest</dt><dd>v3.2.1</dd></div><div><dt>Platforms</dt><dd>Windows · macOS</dd></div></dl>${tags(feature)}<div class="feature-actions"><a class="button primary card-link" href="/projects/${feature.slug}/">Project details</a><a class="text-link" href="${feature.url}">View source</a></div></div><a class="featured-visual" href="/projects/${feature.slug}/" aria-label="EasyWhisperUI project details"><img src="/assets/whisper-main.png" alt="EasyWhisperUI main window showing GPU readiness, model selection, and transcription options" width="1800" height="1298" loading="lazy"><span class="visual-caption">Main window · local transcription on your hardware</span></a></article>
<article class="featured workout-feature"><div class="featured-copy"><p class="eyebrow lavender">${workout.category}</p><h3>${workout.title}</h3><p class="feature-summary">${workout.summary}</p><p>${workout.description}</p>${tags(workout)}<a class="text-link card-link" href="/projects/${workout.slug}/">Project details</a></div><a class="featured-visual workout-preview" href="/projects/${workout.slug}/" aria-label="Workout Counter project details"><img src="/assets/workout-counting.jpg" alt="Workout Counter counting a bicep curl with a green pose overlay, 7 of a 10-rep goal, and a pause control" width="900" height="1599" loading="lazy"><span class="visual-caption">Counting · pose overlay and live rep count</span></a></article>
<div class="project-grid">${[auto60, telemedicine].map(p => cardLink(p)).join('')}</div>
<div class="more-heading"><h3>Other Projects</h3><span>EXPERIMENTS AND COURSEWORK</span></div>
<div class="more-grid">${[database, gemini, snake].map(smallCard).join('')}</div></section>
${experience}${education}
<section id="about" class="about wrap"><div><p class="eyebrow">04 / ABOUT</p><h2>About Me</h2></div><div class="about-story"><p>I graduated from Queens College in December 2025 with a degree in computer science. I currently split my time between AI evaluation work and software projects, most recently EasyWhisperUI and Workout Counter.</p><p>My main interests are desktop software, local AI, full-stack development, and tools that solve a specific problem well. I like the parts of a project that involve architecture, platform constraints, and making something dependable enough for other people to use.</p></div></section>
<section id="contact" class="contact wrap"><p class="eyebrow">05 / CONTACT</p><h2>Connect</h2><div class="contact-bottom"><p>For software engineering, full-stack, or AI engineering roles, email is the best way to reach me. My resume and code are a click away.</p><div class="contact-actions"><a class="button primary" href="mailto:${email}">Email me</a><a class="button primary" href="https://www.linkedin.com/in/mehtabmahir/">LinkedIn</a><a class="button" href="/resume/">Resume</a></div></div><a class="contact-email" href="mailto:${email}">${email}</a></section></main>`;

const schema = `<script type="application/ld+json">${JSON.stringify({
  '@context':'https://schema.org','@type':'Person',name:'Mehtab Mahir',jobTitle:'Software Engineer',
  url:`${site}/`,email:`mailto:${email}`,
  alumniOf:{'@type':'CollegeOrUniversity',name:'Queens College, City University of New York'},
  sameAs:['https://github.com/mehtabmahir','https://www.linkedin.com/in/mehtabmahir/'],
  knowsAbout:['Desktop application development','TypeScript','React','Electron','Python','Local AI','Full-stack development']
})}</script>`;

await mkdir('dist', {recursive:true});
await cp('public','dist',{recursive:true});
// Self-host the renderer and its assets; no CDN or runtime third-party requests.
await mkdir('dist/vendor/pdfjs', {recursive:true});
for (const file of ['pdf.mjs', 'pdf.worker.mjs']) await cp(`node_modules/pdfjs-dist/legacy/build/${file}`, `dist/vendor/pdfjs/${file}`);
for (const dir of ['cmaps', 'standard_fonts', 'wasm']) await cp(`node_modules/pdfjs-dist/${dir}`, `dist/vendor/pdfjs/${dir}`, {recursive:true});
await cp('node_modules/pdfjs-dist/LICENSE', 'dist/vendor/pdfjs/LICENSE');

await writeFile('dist/index.html',page('Mehtab Mahir — Software Engineer','Software engineer and Queens College computer science graduate building desktop applications, full-stack software, and local AI tools, including EasyWhisperUI.',home,'/',false,schema));

for (const p of projects) {
 const path = `/projects/${p.slug}/`;
 await mkdir(`dist${path}`,{recursive:true});
 const body = p.slug === 'easy-whisper-ui' ? whisperPage(p) : p.slug === 'workout-counter' ? workoutPage(p) : `<main id="main" class="wrap case-study"><a class="back-link" href="/#projects">Back to all projects</a><p class="eyebrow">${p.category}</p><h1>${p.title}</h1><p class="case-intro">${p.summary}</p><p class="case-lede">${p.description}</p>${tags(p)}<div class="case-meta"><span>CONTRIBUTION<strong>${p.role}</strong></span>${p.sourceAvailable === false ? '' : `<a class="button" href="${p.url}">View Source on GitHub</a>`}</div>${p.image?`<div class="case-image"><img src="/assets/${p.image}" alt="${p.title} application screenshot" width="1000" height="600" loading="lazy"></div>`:''}<div class="case-section"><h2>The Problem</h2><p>${p.problem}</p></div><div class="case-section"><h2>The Approach</h2><p>${p.solution}</p></div><h2 class="decisions-title">Key Decisions</h2><div class="decisions">${p.decisions.map(([title,text],i)=>`<article><span class="eyebrow">0${i+1}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div><div class="case-section"><h2>${p.outcomeTitle || 'Project Notes'}</h2><div><p>${p.outcome}</p>${p.slug === 'auto-60hz' ? `<a class="text-link outcome-source" href="${p.url}#efficiency">Read the Battery-Life Estimate</a>` : ''}</div></div><a class="text-link" href="/#projects">Back to projects</a></main>`;
 await writeFile(`dist${path}index.html`,page(`${p.title} — Mehtab Mahir`,p.description,body,path));
}

await mkdir('dist/admin',{recursive:true});
await writeFile('dist/admin/index.html',page('Resume manager — Mehtab Mahir','Manage the public resume.',`<main id="main" class="wrap admin"><p class="eyebrow">PORTFOLIO / RESUME MANAGER</p><h1>Update Resume</h1><p>Choose a PDF and enter your password to replace the resume on your portfolio. The uploaded file will be public.</p><form id="upload-form"><label for="resume-file">New resume <span>PDF · up to 4 MB</span></label><input id="resume-file" name="resume" type="file" accept="application/pdf,.pdf" required><label for="password">Upload password</label><input id="password" name="password" type="password" autocomplete="current-password" minlength="8" maxlength="256" required><button class="button primary" type="submit">Upload & replace resume</button><p id="upload-status" role="status" aria-live="polite"></p></form><a class="text-link" href="/resume/">View current resume</a><noscript>Enable JavaScript to upload a resume.</noscript></main><script src="/admin.js" defer></script>`,'/admin/',true));

await mkdir('dist/resume',{recursive:true});
await writeFile('dist/resume/index.html',page('Resume — Mehtab Mahir','View or download Mehtab Mahir’s latest resume.',`<main id="main" class="wrap resume-page resume-viewer"><p class="eyebrow">BACKGROUND &amp; EXPERIENCE</p><h1>Resume</h1><p>View or download my resume for my experience, education, and technical skills.</p><div id="resume-state" role="status" aria-live="polite">Checking for the latest resume…</div><div id="resume-actions"><a class="button primary" href="/api/resume?download=1">Download PDF</a><a class="button" href="/api/resume" target="_blank" rel="noopener">Open PDF</a></div><div id="resume-toolbar" class="resume-toolbar" role="group" aria-label="Resume zoom" hidden><button class="button" id="resume-zoom-out" type="button" aria-label="Zoom out">−</button><output id="resume-zoom" aria-label="Zoom relative to fitted page" aria-live="polite"></output><button class="button" id="resume-zoom-in" type="button" aria-label="Zoom in">+</button><button class="button" id="resume-fit" type="button">Fit page</button></div><div id="resume-preview" role="region" aria-label="Resume preview. Use zoom controls to enlarge." tabindex="0" hidden><div id="resume-pages"></div></div><noscript><a href="/api/resume">Open the latest resume PDF</a></noscript><div class="resume-admin-link"><a class="button" href="/admin/">Update Resume</a><span>Internal Use Only · Password Required</span></div></main><script src="/resume.js" type="module"></script>`,'/resume/'));

await writeFile('dist/404.html',page('Page not found — Mehtab Mahir','This page could not be found.',`<main id="main" class="wrap resume-page"><p class="eyebrow">404 / NOT FOUND</p><h1>Page Not Found</h1><p>The page you’re looking for isn’t here.</p><a class="button primary" href="/">Back to the portfolio</a></main>`));
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://mehtab.work/sitemap.xml\n');
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/resume/',...projects.map(p=>`/projects/${p.slug}/`)].map(p=>`<url><loc>${site}${p}</loc></url>`).join('')}</urlset>`);
console.log(`Built homepage, ${projects.length} project pages, resume, admin, and 404 in dist/.`);
