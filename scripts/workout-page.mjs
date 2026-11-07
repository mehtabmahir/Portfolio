const repo = 'https://github.com/mehtabmahir/Workout-Counter';
const github = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.123-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.652.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.29 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12Z"/></svg>';

const shots = [
  { key: 'home', src: 'workout-home.jpg', width: 900, height: 1956, title: 'Home', note: 'Choose an exercise, including bicep curls',
    alt: 'Workout Counter home screen with Bicep Curls ready to start and more exercises marked in development' },
  { key: 'counting', src: 'workout-counting.jpg', width: 707, height: 1536, title: 'Live counting', note: 'Pose overlay, rep count, and goal progress',
    alt: 'Workout Counter counting screen with a green pose overlay on a person curling a dumbbell, 7 of a 10-rep goal, and a Pause Set control' },
  { key: 'complete', src: 'workout-complete.jpg', width: 900, height: 1955, title: 'Set complete', note: 'Goal reached, with another set or a new target',
    alt: 'Workout Counter set-complete screen reading Goal achieved and You completed 10 reps, with Start Another Set and Change Rep Target buttons' }
];

const features = [
  ['Live pose overlay', 'Apple Vision joints are drawn over the camera feed, so the tracked arm stays visible while you move.'],
  ['Repetition goals', 'A target count and progress bar show how many reps remain in the set.'],
  ['Audio and haptics', 'Feedback confirms a counted rep without a glance at the screen.'],
  ['On-device processing', 'Vision runs on the phone. Video stays on the device, and no account is required.']
];

export function workoutPage(p) {
  const first = shots[0];
  const screens = shots.map((shot, i) => `<img src="/assets/${shot.src}" alt="${shot.alt}" width="${shot.width}" height="${shot.height}" loading="lazy" decoding="async" data-title="${shot.title}" data-note="${shot.note}"${i ? ' hidden' : ''}>`).join('');
  const dots = shots.map((shot, i) => `<span class="wc-dot${i ? '' : ' is-active'}" data-wc-dot></span>`).join('');

  return `<main id="main" class="wrap wc-page">
 <header class="wc-hero">
  <p class="eyebrow">iOS · ON-DEVICE VISION</p>
  <h1>Workout Counter iOS</h1>
  <p class="wc-headline">Count reps without watching the screen.</p>
  <p class="wc-lead">An iPhone app that counts bicep curls from live camera input and overlays the tracked arm on the view. Rep goals, audio, and haptics report progress, and everything runs on the device.</p>
  <ul class="tags" aria-label="Technologies">${p.tags.map(t => `<li>${t}</li>`).join('')}</ul>
  <div class="wc-hero-actions"><a class="button primary" href="${repo}">${github} View source</a></div>
  <ul class="wc-facts" aria-label="Product properties"><li>On-device Vision</li><li>No account</li><li>No recording</li></ul>
 </header>

 <section class="wc-showcase" aria-labelledby="screens-title">
  <div class="wc-showcase-head"><p class="eyebrow">PRODUCT TOUR</p><h2 id="screens-title">Screens</h2></div>
  <div class="wc-stage">
   <p class="wc-hint">Click or tap the screen to cycle through the set.</p>
   <button class="wc-viewer" type="button" data-wc-viewer aria-label="Show next screen" aria-describedby="wc-caption" title="Show next screen">
    <span class="wc-phone">${screens}</span>
   </button>
   <div class="wc-caption" id="wc-caption" aria-live="polite" aria-atomic="true"><span><b data-caption-title>${first.title}</b><span data-caption-note>${first.note}</span></span></div>
   <div class="wc-dots" aria-hidden="true">${dots}</div>
  </div>
 </section>

 <section class="wc-row" aria-labelledby="problem-title">
  <div class="wc-row-label"><h2 id="problem-title">The problem</h2></div>
  <div class="wc-row-body"><p>${p.problem}</p></div>
 </section>

 <section class="wc-row" aria-labelledby="features-title">
  <div class="wc-row-label"><h2 id="features-title">What it does</h2></div>
  <div class="wc-row-body"><ul class="wc-features">${features.map(([title, text]) => `<li><h3>${title}</h3><p>${text}</p></li>`).join('')}</ul></div>
 </section>

 <section class="wc-row" aria-labelledby="how-title">
  <div class="wc-row-label"><h2 id="how-title">How it counts</h2></div>
  <div class="wc-row-body">
   <p>${p.solution}</p>
   <ol class="wc-steps">
    ${p.decisions.map(([title, text], i) => `<li><span class="wc-step">0${i + 1}</span><div><h3>${title}</h3><p>${text}</p></div></li>`).join('')}
   </ol>
  </div>
 </section>

 <section class="wc-row" aria-labelledby="scope-title">
  <div class="wc-row-label"><h2 id="scope-title">Current scope</h2></div>
  <div class="wc-row-body"><p>${p.outcome}</p></div>
 </section>

 <div class="wc-end"><a class="text-link" href="${repo}">Browse the repository</a></div>
</main><script src="/workout-gallery.js" defer></script>`;
}
