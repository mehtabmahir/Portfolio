import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
test('built pages have one h1, metadata, and valid internal links and assets',async()=>{
 const files=await readdir('dist',{recursive:true});const html=files.filter(p=>p.endsWith('.html'));
 assert.ok(html.length>=11);
 for(const file of html){const content=await readFile(`dist/${file}`,'utf8');assert.equal((content.match(/<h1[ >]/g)||[]).length,1,file);assert.match(content,/name="description"/);assert.match(content,/lang="en"/);
 for(const [,url] of content.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)){if(url.startsWith('/api/'))continue;const path=url.split('#')[0].split('?')[0]||'/';await access(resolve('dist','.'+path+(path.endsWith('/')?'index.html':'')));}
 }
 const home=await readFile('dist/index.html','utf8');assert.match(home,/Handshake/);assert.match(home,/Workout Counter/);assert.match(home,/mehtab\.mahir@gmail\.com/);assert.doesNotMatch(home,/chetanverma|qmail|Aspiring/);
});


test('homepage and EasyWhisperUI case study carry current verified content', async () => {
 const home = await readFile('dist/index.html','utf8');
 assert.match(home, /May 2026 – Present/);
 assert.match(home, /Bachelor’s Degree in Computer Science/);
 assert.match(home, /Queens College, City University of New York/);
 assert.match(home, /llama\.cpp/);
 assert.match(home, /588/);
 assert.match(home, /EasyWhisperUI/);
 assert.match(home, /twitter:card/);
 await access('dist/assets/og.jpg');
 const whisper = await readFile('dist/projects/easy-whisper-ui/index.html','utf8');
 assert.match(whisper, /Transcript Reader/);
 assert.match(whisper, /v3\.2\.1/);
 assert.match(whisper, /llama\.cpp/);
 assert.match(whisper, /data-platform="windows"/);
 assert.match(whisper, /Linux support|Linux beta|Linux works/);
 assert.doesNotMatch(whisper, /500\+ GitHub stars/);
 const workout = await readFile('dist/projects/workout-counter/index.html','utf8');
 assert.match(workout, /Workout Counter iOS/);
 assert.match(workout, /workout-home\.jpg/);
 assert.match(workout, /workout-counting\.jpg/);
 assert.match(workout, /workout-complete\.jpg/);
 assert.match(workout, /data-wc-viewer/);
 assert.match(workout, /workout-gallery\.js/);
 assert.match(workout, /Apple Vision/);
 assert.match(workout, /130°/);
 assert.doesNotMatch(workout, /500\+/);
 const database = await readFile('dist/projects/database-normalization/index.html','utf8');
 assert.match(database, /CSCI331Group3/);
 assert.match(database, /3NF/);
});

test('every local link fragment resolves on its destination page', async () => {
 const files = (await readdir('dist', {recursive:true})).filter(file => file.endsWith('.html'));
 for (const file of files) {
  const content = await readFile(`dist/${file}`, 'utf8');
  for (const [, href] of content.matchAll(/href="([^"]*#[^"]+)"/g)) {
   if (!href.startsWith('/') && !href.startsWith('#')) continue;
   const [pathname, fragment] = href.split('#');
   const target = pathname ? resolve('dist', '.' + pathname + (pathname.endsWith('/') ? 'index.html' : '')) : resolve('dist', file);
   const destination = await readFile(target, 'utf8');
   const ids = [...destination.matchAll(/id="([^"]+)"/g)].map(match => match[1]);
   assert.ok(ids.includes(decodeURIComponent(fragment)), `${file}: missing target ${href}`);
  }
 }
});
