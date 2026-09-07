import { scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { PDFDocument } from 'pdf-lib';
const scrypt = promisify(scryptCallback);
export const MAX_BYTES = 4 * 1024 * 1024;
const headers = {'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
export function validHash(hash) { return typeof hash === 'string' && /^scrypt:[a-f0-9]{32}:[a-f0-9]{128}$/.test(hash); }
export async function verifyPassword(password, hash) {
  if (!validHash(hash) || typeof password !== 'string' || password.length<16 || password.length>256) return false;
  const [,salt,expected]=hash.split(':');
  const actual=await scrypt(password,salt,64);
  return timingSafeEqual(actual,Buffer.from(expected,'hex'));
}
const error = (message,status) => Response.json({error:message},{status,headers});
export async function uploadResume(request, {passwordHash, getStore}) {
  if (request.method!=='POST') return new Response(null,{status:405,headers:{...headers,Allow:'POST'}});
  if (!validHash(passwordHash)) return error('Uploads are not configured.',503);
  if (request.headers.get('origin')!==new URL(request.url).origin) return error('Invalid origin.',403);
  const length=Number(request.headers.get('content-length'));
  if (length>MAX_BYTES) return error('File too large.',413);
  if (!await verifyPassword(request.headers.get('x-resume-password'),passwordHash)) return error('Invalid password.',401);
  if (request.headers.get('content-type')?.split(';')[0]!=='application/pdf') return error('A PDF is required.',415);
  try {
    if (!request.body) return error('A PDF is required.',415);
    const reader=request.body.getReader(); const chunks=[]; let size=0;
    while (true) { const {value,done}=await reader.read(); if(done)break; size+=value.length; if(size>MAX_BYTES){await reader.cancel();return error('File too large.',413);} chunks.push(value); }
    const bytes=Buffer.concat(chunks);
    if(bytes.subarray(0,5).toString()!=='%PDF-')return error('Invalid PDF.',415);
    try { const doc=await PDFDocument.load(bytes,{updateMetadata:false}); if(doc.getPageCount()<1)return error('Empty PDF.',415); } catch {return error('Invalid or encrypted PDF.',415);}
    // A single atomic key replacement keeps the old resume readable until the new write succeeds.
    await getStore().set('current.pdf',bytes,{metadata:{updatedAt:new Date().toISOString()}});
    return Response.json({ok:true},{headers});
  } catch { return error('Unable to store the resume.',500); }
}
export async function readResume(request,{getStore,readInitial}) {
  if (!['GET','HEAD'].includes(request.method)) return new Response(null,{status:405,headers:{...headers,Allow:'GET, HEAD'}});
  try {
    const stored=await getStore().get('current.pdf',{type:'arrayBuffer'});
    const bytes=stored ?? await readInitial();
    if(!bytes)return error('No resume available.',404);
    const download=new URL(request.url).searchParams.get('download')==='1';
    return new Response(request.method==='HEAD'?null:bytes,{headers:{...headers,'Content-Type':'application/pdf','Content-Length':String(bytes.byteLength),'Content-Disposition':`${download?'attachment':'inline'}; filename="Mehtab-Mahir-Resume.pdf"`,'X-Frame-Options':'SAMEORIGIN','Content-Security-Policy':"default-src 'none'; frame-ancestors 'self'"}});
  } catch {return error('Resume temporarily unavailable.',503);}
}
