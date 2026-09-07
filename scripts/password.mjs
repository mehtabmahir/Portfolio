import { randomBytes,scryptSync } from 'node:crypto';
// Generate a random upload password so no secret needs to be typed into shell history.
const password=randomBytes(24).toString('base64url');
const salt=randomBytes(16).toString('hex');
const hash=`scrypt:${salt}:${scryptSync(password,salt,64).toString('hex')}`;
console.log(`Save this upload password in your password manager:\n${password}\n\nSet RESUME_PASSWORD_HASH in Netlify (Functions scope) to:\n${hash}\n\nDo not commit either value to your repository.`);
