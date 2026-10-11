(async () => {
  try {
    const response = await fetch('/.netlify/functions/whisper-release', { signal: AbortSignal.timeout(8000) });
    if (!response.ok) return;
    const release = await response.json();
    const repo = 'https://github.com/mehtabmahir/easy-whisper-ui';
    if (!/^\d+\.\d+(?:\.\d+)?$/.test(release.version) || !release.releaseUrl?.startsWith(`${repo}/releases/tag/`)) return;
    for (const platform of ['windows', 'macos']) {
      const asset = release[platform];
      if (asset && (!asset.url?.startsWith(`${repo}/releases/download/`) || !Number.isSafeInteger(asset.size) || asset.size <= 0)) return;
    }
    document.querySelector('[data-release-version]').textContent = release.version;
    document.querySelectorAll('[data-release-notes], [data-release-opening]').forEach(link => { link.href = release.releaseUrl; });
    for (const platform of ['windows', 'macos']) {
      const card = document.querySelector(`[data-platform="${platform}"]`);
      const button = card.querySelector('[data-download]');
      const detail = card.querySelector('[data-download-detail]');
      const asset = release[platform];
      if (asset) {
        button.href = asset.url;
        detail.textContent = `v${release.version} · ${platform === 'windows' ? 'EXE installer' : 'DMG'} · ${Math.round(asset.size / 1000000)} MB`;
      } else {
        button.removeAttribute('href');
        button.setAttribute('aria-disabled', 'true');
        button.textContent = 'Coming soon';
        detail.textContent = `v${release.version} · Download pending`;
      }
    }
    document.querySelector('[data-linux-status]').textContent = release.linux ? `Linux ${release.version} is available on GitHub.` : `Linux ${release.version} is pending.`;
  } catch {
    // Keep the verified static downloads when offline or GitHub is unavailable.
  }
})();
