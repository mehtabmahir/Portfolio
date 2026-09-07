const form = document.querySelector('#upload-form');
const status = document.querySelector('#upload-status');
form.addEventListener('submit', async event => {
  event.preventDefault();
  const file = form.elements.resume.files[0];
  const password = form.elements.password;
  const button = form.querySelector('button');
  status.className = '';
  if (!file || !file.name.toLowerCase().endsWith('.pdf') || file.size > 4 * 1024 * 1024 || file.size === 0) {
    status.textContent = 'Choose a PDF smaller than 4 MB.'; status.className = 'error'; return;
  }
  button.disabled = true; button.textContent = 'Uploading…';
  status.textContent = 'Uploading your resume. Please keep this page open.';
  try {
    const response = await fetch('/api/resume-upload', {method:'POST', headers:{'Content-Type':'application/pdf','X-Resume-Password':password.value},body:file});
    if (!response.ok) {
      const messages = {401:'That password isn’t correct. Please try again.',403:'Uploads must be made from this website.',413:'The PDF must be smaller than 4 MB.',415:'Please choose a valid, unencrypted PDF.',429:'Too many attempts. Wait a few minutes before trying again.',503:'Resume uploads need to be enabled in the site’s Netlify settings.'};
      throw new Error(messages[response.status] || 'The upload did not finish. Your previous resume is unchanged. Please try again.');
    }
    status.textContent = 'Your new resume is live. All resume links now open this PDF.';
    status.className = 'success'; form.reset();
  } catch(error) { status.textContent = error.message === 'Failed to fetch' ? 'Could not reach the server. Check your connection, then view the current resume before retrying.' : error.message; status.className = 'error'; }
  finally { password.value = ''; button.disabled = false; button.textContent = 'Upload & replace resume ↑'; }
});
