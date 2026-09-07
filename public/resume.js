const state = document.querySelector('#resume-state');
fetch('/api/resume', {method:'HEAD',cache:'no-store'}).then(response=> {
  if (response.ok) {
    state.textContent='';
    document.querySelector('#resume-actions').hidden=false;
    const preview=document.querySelector('#resume-preview');
    preview.src='/api/resume#view=FitH';
    preview.hidden=false;
  }
  else if (response.status===404) state.textContent='My resume isn’t available here yet. Please email me for a copy.';
  else throw new Error();
}).catch(()=> { state.textContent='The resume service is temporarily unavailable. Please email me for a copy.'; });
