import { getStore } from '@netlify/blobs';
import { uploadResume } from '../lib/resume.mjs';
export default request => uploadResume(request,{passwordHash:process.env.RESUME_PASSWORD_HASH,getStore:()=>getStore({name:'portfolio-resume',consistency:'strong'})});
export const config={path:'/api/resume-upload',rateLimit:{windowLimit:5,windowSize:180,aggregateBy:['ip','domain']}};
