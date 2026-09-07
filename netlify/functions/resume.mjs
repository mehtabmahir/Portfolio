import { getStore } from '@netlify/blobs';
import { readFile } from 'node:fs/promises';
import { readResume } from '../lib/resume.mjs';
export default request => readResume(request,{getStore:()=>getStore({name:'portfolio-resume',consistency:'strong'}),readInitial:()=>readFile('netlify/initial-resume.pdf')});
export const config={path:'/api/resume'};
