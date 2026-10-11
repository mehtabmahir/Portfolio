import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import handler, { releaseSummary } from '../netlify/functions/whisper-release.mjs';
const repo = 'https://github.com/mehtabmahir/easy-whisper-ui';
const asset = name => ({ name, state: 'uploaded', size: 124000000, browser_download_url: `${repo}/releases/download/v3.2/${name}` });
const fixture = { tag_name: 'v3.2', assets: [asset('EasyWhisperUI-Setup-3.2.0-win-x64.exe'), asset('EasyWhisperUI-3.2.0-macOS-arm64.dmg')] };
test('selects installers, rejects external URLs and marks missing platforms pending', () => {
 const result = releaseSummary(fixture);
 assert.equal(result.version, '3.2');
 assert.equal(result.windows.size, 124000000);
 assert.ok(result.macos.url.endsWith('.dmg'));
 assert.equal(releaseSummary({...fixture, assets:[{...fixture.assets[0],browser_download_url:'https://evil.example/file.exe'}]}).windows, null);
 assert.equal(releaseSummary({...fixture, assets:[]}).macos, null);
 assert.throws(()=>releaseSummary({...fixture, prerelease:true}));
});
test('endpoint returns cached metadata and handles failed or malformed upstream responses', async t => {
 t.mock.method(globalThis, 'fetch', async ()=>Response.json(fixture));
 const good = await handler();
 assert.equal(good.status,200);
 assert.match(good.headers.get('Netlify-CDN-Cache-Control'),/s-maxage=600/);
 assert.equal((await good.json()).version,'3.2');
 globalThis.fetch = async ()=>new Response('bad JSON');
 assert.equal((await handler()).status,503);
 globalThis.fetch = async ()=>new Response('', {status:429});
 assert.equal((await handler()).status,503);
});
test('browser updates links and sizes, disables missing installers and preserves fallback on failure', async () => {
 const script=await readFile(new URL('../public/whisper-release.js', import.meta.url),'utf8');
 function element(){return {textContent:'fallback', href:'fallback',removeAttribute(key){delete this[key]},setAttribute(key,value){this[key]=value}};}
 const version=element(), linux=element(), notes=element();
 const cards=Object.fromEntries(['windows','macos'].map(p=>[p,{'[data-download]':element(),'[data-download-detail]':element()}]));
 const document={querySelector(s){if(s==='[data-release-version]')return version;if(s==='[data-linux-status]')return linux;const p=s.includes('windows')?'windows':'macos';return {querySelector:s=>cards[p][s]};},querySelectorAll(){return [notes]}};
 const result=releaseSummary({...fixture,assets:[fixture.assets[0]]});
 await vm.runInNewContext(script,{document,AbortSignal,fetch:async()=>Response.json(result)});
 assert.equal(version.textContent,'3.2');
 assert.equal(notes.href,result.releaseUrl);
 assert.equal(cards.windows['[data-download]'].href,result.windows.url);
 assert.match(cards.windows['[data-download-detail]'].textContent,/124 MB/);
 assert.equal(cards.macos['[data-download]']['aria-disabled'],'true');
 assert.equal(cards.macos['[data-download]'].href,undefined);
 version.textContent='fallback';
 await vm.runInNewContext(script,{document,AbortSignal,fetch:async()=>{throw Error('offline')}});
 assert.equal(version.textContent,'fallback');
});
