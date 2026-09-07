import test from 'node:test';
import assert from 'node:assert/strict';
import { scryptSync } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { PDFDocument } from 'pdf-lib';
import { uploadResume, readResume, MAX_BYTES } from '../netlify/lib/resume.mjs';
const password='a-strong-test-password-only'; const salt='0123456789abcdef0123456789abcdef';
const passwordHash=`scrypt:${salt}:${scryptSync(password,salt,64).toString('hex')}`;
const doc=await PDFDocument.create();doc.addPage();const pdf=await doc.save();
const request=(body=pdf,extra={})=>new Request('https://example.netlify.app/api/resume-upload',{method:'POST',headers:{origin:'https://example.netlify.app','x-resume-password':password,'content-type':'application/pdf',...extra},body});
function fixture(){let value=null;let writes=0;return {options:{passwordHash,getStore:()=>({set:async(k,b)=>{value=b;writes++},get:async()=>value})},get writes(){return writes}};}
test('upload and public read round-trip, replacement and download',async()=>{
 const f=fixture();assert.equal((await uploadResume(request(),f.options)).status,200);assert.equal(f.writes,1);
 const response=await readResume(new Request('https://example.netlify.app/api/resume?download=1'),{...f.options,readInitial:()=>{throw Error('must not use initial')}});
 assert.equal(response.status,200);assert.match(response.headers.get('content-disposition'),/^attachment/);assert.equal(response.headers.get('cache-control'),'no-store');assert.deepEqual(new Uint8Array(await response.arrayBuffer()),pdf);
 const updated=await PDFDocument.create();updated.addPage([300,400]);const replacement=await updated.save();
 assert.equal((await uploadResume(request(replacement),f.options)).status,200);
 const latest=await readResume(new Request('https://example.netlify.app/api/resume'),f.options);assert.deepEqual(new Uint8Array(await latest.arrayBuffer()),replacement);
});
test('wrong password, absent config, foreign origin and wrong method cannot write',async()=>{
 const f=fixture();assert.equal((await uploadResume(request(pdf,{'x-resume-password':'wrong-password-long-enough'}),f.options)).status,401);
 assert.equal((await uploadResume(request(),{...f.options,passwordHash:''})).status,503);
 assert.equal((await uploadResume(request(pdf,{origin:'https://attacker.example'}),f.options)).status,403);
 assert.equal((await uploadResume(new Request('https://example.netlify.app/api/resume-upload'),f.options)).status,405);assert.equal(f.writes,0);
});
test('invalid, mislabeled, encrypted and oversized PDFs cannot overwrite',async()=>{
 const f=fixture();await uploadResume(request(),f.options);
 const encrypted=await readFile('tests/encrypted-fixture.pdf');
 for(const [body,headers,status] of [[encrypted,{},415],[Buffer.from('%PDF-fake'),{},415],[pdf,{'content-type':'text/plain'},415],[new Uint8Array(MAX_BYTES+1),{},413],[pdf,{'content-length':String(MAX_BYTES+1)},413]])assert.equal((await uploadResume(request(body,headers),f.options)).status,status);
 assert.equal(f.writes,1);
});
test('initial supplied PDF is valid and used when no upload exists; HEAD has no body',async()=>{
 const f=fixture();const initial=await readFile('netlify/initial-resume.pdf');assert.ok((await PDFDocument.load(initial)).getPageCount()>0);
 const response=await readResume(new Request('https://example.netlify.app/api/resume'),{...f.options,readInitial:()=>initial});assert.deepEqual(Buffer.from(await response.arrayBuffer()),initial);
 const head=await readResume(new Request('https://example.netlify.app/api/resume',{method:'HEAD'}),{...f.options,readInitial:()=>initial});assert.equal(head.status,200);assert.equal(await head.text(),'');assert.equal(Number(head.headers.get('content-length')),initial.length);
});
test('storage failures return a controlled error, never leak details or serve a stale initial PDF',async()=>{
 const options={passwordHash,getStore:()=>({set:()=>{throw Error('secret')},get:()=>{throw Error('secret')}}),readInitial:()=>pdf};
 const upload=await uploadResume(request(),options);assert.equal(upload.status,500);assert.doesNotMatch(await upload.text(),/secret/);
 assert.equal((await readResume(new Request('https://example.netlify.app/api/resume'),options)).status,503);
});
