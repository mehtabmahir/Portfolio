const repo = 'https://github.com/mehtabmahir/easy-whisper-ui';
const release = `${repo}/releases/tag/v3.2.1`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></svg>';
const source = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.29 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"/></svg>';

const features = [
  ['Local transcription', 'whisper.cpp turns audio and video into text, with Vulkan on Windows GPUs, Metal on Apple Silicon, or CPU-only processing.'],
  ['Batch and live', 'Queue several files with FFmpeg conversion and cached audio, or read microphone speech as it arrives.'],
  ['Transcript Reader', 'Text appears while Whisper works, with Markdown rendering and topic navigation for long recordings.'],
  ['Local AI', 'Clean up, summarize, or run a custom request with a Qwen model through llama.cpp, a custom GGUF file, or an OpenAI-compatible endpoint.'],
  ['Model management', 'Download, verify, and delete Whisper and language models in one place, with memory estimates to guide GPU selection.'],
  ['Guided setup', 'Windows installs its toolchain and builds Whisper on first launch; macOS ships the binaries. Updates verify the installer before opening it.']
];

export function whisperPage() {
  return `<main id="main" class="wrap whisper-page">
 <a class="back-link" href="/#projects">Back to all projects</a>
 <section class="whisper-hero" aria-labelledby="whisper-title">
  <p class="eyebrow">DESKTOP APPLICATION · LOCAL AI</p>
  <h1 id="whisper-title">EasyWhisperUI</h1>
  <p class="whisper-headline">Local transcription.<br><span>Local intelligence.</span></p>
  <p class="whisper-lead">Turns audio and video into transcripts and subtitles with whisper.cpp, then cleans up or summarizes them with a language model running on the same machine.</p>
  <div class="whisper-actions"><a class="button primary" href="#downloads">${arrow} Download</a><a class="button" href="${repo}">${source} View source</a><a class="text-link" data-release-notes href="${release}">Release notes</a></div>
  <p class="whisper-small">Windows 10/11 and Apple Silicon Mac · Linux beta · Electron, React, TypeScript</p>
 </section>

 <section class="whisper-previews" aria-label="Application screenshots">
  ${[
    ['main', 'EasyWhisperUI main window on Windows', 'Main window'],
    ['reader', 'EasyWhisperUI Transcript Reader showing a cleaned transcript with local AI controls', 'Transcript Reader']
  ].map(([name, alt, caption]) => `<figure><a class="shot-frame" href="/assets/whisper-${name}.png" aria-label="Open the ${caption} screenshot at full size"><img src="/assets/whisper-${name}.png" alt="${alt}" width="1800" height="${name === 'main' ? 1298 : 1282}" loading="lazy"></a><figcaption>${caption}</figcaption></figure>`).join('')}
 </section>

 <section class="whisper-section" aria-labelledby="problem-title">
  <div class="whisper-section-head">
   <h2 id="problem-title">The problem.</h2>
  </div>
  <div class="whisper-prose">
   <p>Whisper and its models are free, but using them means assembling a toolchain: model files, FFmpeg conversion, a GPU-enabled build, and a way to read the result. Repeating that for every recording is a chore, and a one-hour file still leaves a wall of text to organize.</p>
   <p>EasyWhisperUI removes the setup and adds a workspace for the transcript that comes out the other side.</p>
  </div>
 </section>

 <section class="whisper-section" aria-labelledby="features-title">
  <div class="whisper-section-head">
   <h2 id="features-title">What it does.</h2>
  </div>
  <dl class="feature-list">
   ${features.map(([title, text]) => `<div><dt>${title}</dt><dd>${text}</dd></div>`).join('')}
  </dl>
 </section>

 <section class="whisper-section" aria-labelledby="how-title">
  <div class="whisper-section-head">
   <h2 id="how-title">How it works.</h2>
  </div>
  <div class="whisper-prose">
   <p>React and TypeScript render the interface with no Node.js access. A preload bridge exposes a small typed API, and the Electron main process owns files, binaries, model downloads, and transcription. Whisper output arrives as streaming events, which is what fills the reader while a file is still processing.</p>
   <p>One installer covers the parts users would otherwise configure by hand. Windows setup downloads its toolchain, builds whisper.cpp with Vulkan support, and validates the install; macOS ships Whisper, Metal support, and FFmpeg.</p>
  </div>
  <ul class="note-list">
   <li>Renderer, preload, and main process share one typed IPC contract.</li>
   <li>Queued files move through conversion, model download, and transcription, so stopping the queue cancels all three.</li>
   <li>Model and installer downloads are pinned and checked against SHA-256 hashes before use.</li>
  </ul>
 </section>

 <section class="whisper-section" aria-labelledby="adoption-title">
  <div class="whisper-section-head">
   <h2 id="adoption-title">Adoption.</h2>
  </div>
  <dl class="feature-stats">
   <div><dt>GitHub stars</dt><dd>588</dd></div>
   <div><dt>Forks</dt><dd>37</dd></div>
   <div><dt>Latest release</dt><dd>v3.2.1</dd></div>
  </dl>
  <div class="whisper-prose">
   <p>Public since March 2025 and maintained through 2026. Queue controls, live output, language detection, and repeated-phrase handling all came from user reports.</p>
   <p>Windows and Apple Silicon macOS are the stable targets. Linux remains beta with 3.2 installers and in-app updates pending; Windows builds are unsigned and the Mac app is not notarized.</p>
  </div>
 </section>

 <section id="downloads" class="whisper-downloads" aria-labelledby="download-title">
  <div class="whisper-section-heading"><div><p class="eyebrow">GET STARTED</p><h2 id="download-title">Choose your platform.</h2></div><a class="text-link" data-release-notes href="${release}">Release notes</a></div>
  <div class="whisper-download-grid">
   <article class="whisper-download-card" data-platform="windows"><p class="eyebrow">WINDOWS</p><h3>Ready for your PC.</h3><p>Windows 10 / 11 · 64-bit<br>AMD · NVIDIA · Intel GPUs (Vulkan)</p><a class="button primary" data-download href="${repo}/releases/download/v3.2.1/EasyWhisperUI-Setup-3.2.1-win-x64.exe">${arrow} Download for Windows</a><span class="whisper-small" data-download-detail>v3.2.1 · EXE installer · 187 MB</span><p class="whisper-install-note">Run the installer, then let the app prepare Whisper on first launch. Current graphics drivers with Vulkan support enable GPU acceleration.</p></article>
   <article class="whisper-download-card" data-platform="macos"><p class="eyebrow">MACOS</p><h3>Made for Apple Silicon.</h3><p>macOS 13+ · M-series Mac<br>Metal GPU acceleration</p><a class="button primary" data-download href="${repo}/releases/download/v3.2.1/EasyWhisperUI-3.2.1-macOS-arm64.dmg">${arrow} Download for Mac</a><span class="whisper-small" data-download-detail>v3.2.1 · DMG · 223 MB</span><p class="whisper-install-note">Open the DMG and drag EasyWhisperUI into Applications. Whisper and FFmpeg are included.</p></article>
  </div>
  <div class="whisper-download-help"><p>Windows builds are unsigned; the Mac app is ad-hoc signed and not notarized. <a data-release-opening href="${release}">First-opening instructions</a></p><p><span data-linux-status>Linux 3.2 is pending.</span> <a href="${repo}/releases">Browse previous releases</a></p></div>
 </section>
 </main><script src="/whisper-release.js" defer></script>`;
}
