const repo = 'https://github.com/mehtabmahir/easy-whisper-ui';
const release = `${repo}/releases/tag/v3.1`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg>';
const source = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.29 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"/></svg>';
export function whisperPage(p) {
 return `<main id="main" class="wrap whisper-page">
 <a class="back-link" href="/#projects">← All projects</a>
 <section class="whisper-hero" aria-labelledby="whisper-title">
  <p class="eyebrow">LOCAL TRANSCRIPTION · VERSION <span data-release-version>3.1.0</span></p>
  <h1 id="whisper-title">EasyWhisperUI</h1>
  <p class="whisper-headline">Your audio.<br><span>Your hardware.</span></p>
  <p class="whisper-lead">Turn audio and video into transcripts and subtitles, using the power of your own computer. Private by design. No cloud uploads.</p>
  <div class="whisper-actions"><a class="button primary" href="#downloads">${arrow} Download free</a><a class="button" href="${repo}">${source} View source</a></div>
  <p class="whisper-small">Windows + Apple Silicon Mac · No ads or subscriptions</p>
 </section>
 <section class="whisper-previews" aria-label="App previews">
  ${[['macos','Apple Silicon Mac'],['windows','Windows']].map(([platform,label])=>`<figure><a href="/assets/whisper-${platform}.png" aria-label="View full ${label} screenshot"><span class="app-cutout app-cutout-${platform}"><img src="/assets/whisper-${platform}.png" alt="EasyWhisperUI 3.1 on ${label}, showing GPU readiness, model selection and transcription controls" width="1200" height="900"></span></a><figcaption>${label}</figcaption></figure>`).join('')}
 </section>
 <section id="downloads" class="whisper-downloads" aria-labelledby="download-title">
  <div class="whisper-section-heading"><div><p class="eyebrow">GET STARTED</p><h2 id="download-title">Choose your platform.</h2></div><a class="text-link" data-release-notes href="${release}">Release notes ↗</a></div>
  <div class="whisper-download-grid">
   <article class="whisper-download-card" data-platform="windows"><p class="eyebrow">WINDOWS</p><h3>Ready for your PC.</h3><p>Windows 10 / 11 · 64-bit<br>Vulkan GPU acceleration</p><a class="button primary" data-download href="${repo}/releases/download/v3.1/EasyWhisperUI-Setup-3.1.0-win-x64.exe">${arrow} Download for Windows</a><span class="whisper-small" data-download-detail>v3.1.0 · EXE installer · 124 MB</span><p class="whisper-install-note">Run the installer, then let the app prepare Whisper on first launch. Graphics drivers with Vulkan support enable GPU acceleration.</p></article>
   <article class="whisper-download-card" data-platform="macos"><p class="eyebrow">MACOS</p><h3>Made for Apple Silicon.</h3><p>macOS 13+ · M-series Mac<br>Metal GPU acceleration</p><a class="button primary" data-download href="${repo}/releases/download/v3.1/EasyWhisperUI-3.1.0-macOS-arm64.dmg">${arrow} Download for Mac</a><span class="whisper-small" data-download-detail>v3.1.0 · DMG · 171 MB</span><p class="whisper-install-note">Open the DMG and drag EasyWhisperUI into Applications. Whisper and FFmpeg are included.</p></article>
  </div>
  <div class="whisper-download-help"><p>Windows builds are unsigned; the Mac app is ad-hoc signed and not notarized. <a data-release-opening href="${release}">Opening instructions ↗</a></p><p><span data-linux-status>Linux 3.1 is pending.</span> <a href="${repo}/releases">Browse previous releases ↗</a></p></div>
 </section>
 <section class="whisper-features" aria-labelledby="features-title"><p class="eyebrow">BUILT AROUND YOUR WORKFLOW</p><h2 id="features-title">More from your recordings.</h2><div class="whisper-feature-grid">
 ${[
  ['Keep it local','Your recordings stay on your computer. Transcribe offline after the initial setup and model downloads.'],
  ['Put your GPU to work','Vulkan on supported Windows GPUs, Metal on Apple Silicon, or CPU-only processing. Verified GPU status and memory estimates help you choose a model.'],
  ['Transcripts and subtitles','Export readable TXT transcripts or SRT subtitles for your videos. Transcribe multiple languages or translate speech into English.'],
  ['One file or a whole queue','Drop in multiple recordings, skip an item, or stop the queue. Live microphone transcription is also available in beta.'],
  ['Models, on your terms','Download, cancel, or delete models, see transfer speed and time remaining, or load a custom model.'],
  ['Less waiting, more control','Cached audio speeds up retries. Saved themes, CLI options, logs and guided setup keep the everyday workflow simple.']
 ].map(([title,text])=>`<article><h3>${title}</h3><p>${text}</p></article>`).join('')}
 </div></section>
 <section class="whisper-about"><div><p class="eyebrow">THE PROJECT</p><h2>Built by a solo developer.<br>Shaped by its users.</h2></div><div><p>I built EasyWhisperUI to make local transcription easier to use. It brings Whisper, media conversion, model downloads and hardware setup into one desktop app. User feedback continues to shape its batch, live and recovery workflows.</p><p>Free to use and supported by donations. Explore the source, report an issue, or help support continued development.</p><div class="whisper-actions"><a class="button" href="${repo}">${source} View source</a><a class="text-link" href="https://www.paypal.com/donate/?business=5FM6Y27A3CK58&amp;no_recurring=0&amp;currency_code=USD">Support the project ↗</a></div></div></section>
 </main><script src="/whisper-release.js" defer></script>`;
}
