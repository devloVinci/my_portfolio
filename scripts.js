const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Modal for project details
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const id = btn.getAttribute('data-open');
    openProject(id);
  })
});

function openProject(id){
  modal.setAttribute('aria-hidden','false');
  modalContent.innerHTML = `<h3>Project ${id}</h3><p>Detailed description for project ${id}. Add screenshots, tech stack, and links here.</p>`;
}

modalClose && modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
modal && modal.addEventListener('click', (e)=>{ if(e.target === modal) modal.setAttribute('aria-hidden','true') });

// Smooth scroll for nav links
document.querySelectorAll('.nav a, .hero-cta a, .link[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({behavior:'smooth'});
    }
  })
});
