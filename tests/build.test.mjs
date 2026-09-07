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
