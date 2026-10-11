const repo = 'https://github.com/mehtabmahir/easy-whisper-ui';

export function releaseSummary(data) {
  if (data.draft || data.prerelease || !/^v?\d+\.\d+(?:\.\d+)?$/.test(data.tag_name) || !Array.isArray(data.assets)) throw new Error('Invalid release');
  const version = data.tag_name.replace(/^v/, '');
  const releaseUrl = `${repo}/releases/tag/${data.tag_name}`;
  const assets = data.assets.filter(asset => asset.state === 'uploaded' && Number.isSafeInteger(asset.size) && asset.size > 0 && typeof asset.browser_download_url === 'string' && asset.browser_download_url.startsWith(`${repo}/releases/download/${data.tag_name}/`));
  const pick = pattern => {
    const asset = assets.find(a => pattern.test(a.name));
    return asset ? { url: asset.browser_download_url, size: asset.size } : null;
  };
  return { version, releaseUrl,
    windows: pick(/^EasyWhisperUI-Setup-[\d.]+-win-x64\.exe$/i),
    macos: pick(/^EasyWhisperUI-[\d.]+-macOS-arm64\.dmg$/i),
    linux: assets.some(a => /(?:linux.*\.(?:deb|rpm|AppImage|tar\.gz)|\.AppImage)$/i.test(a.name))
  };
}

export default async function handler() {
  try {
    const response = await fetch('https://api.github.com/repos/mehtabmahir/easy-whisper-ui/releases/latest', {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'mehtab-portfolio' },
      signal: AbortSignal.timeout(6000)
    });
    if (!response.ok) throw new Error('Release unavailable');
    return Response.json(releaseSummary(await response.json()), { headers: {
      'Cache-Control': 'public, max-age=60',
      'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600, durable'
    } });
  } catch {
    return Response.json({ error: 'Release unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
