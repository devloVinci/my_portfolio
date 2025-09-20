// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

function setTheme(dark){
  if(dark){
    root.style.setProperty('--bg','#071021');
  } else {
    root.style.setProperty('--bg','#f6f9fc');
  }
}

themeToggle && themeToggle.addEventListener('click', ()=>{
  const isDark = root.style.getPropertyValue('--bg') !== '#f6f9fc';
  setTheme(!isDark ? true : false);
  themeToggle.textContent = isDark ? '🌙' : '☀️';
});

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
