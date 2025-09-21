async function loadProjects(){
  const res = await fetch('assets/data/projects.json');
  const data = await res.json();
  const container = document.getElementById('projectsList');
  const params = new URLSearchParams(location.search);
  const activeId = params.get('project');

  if(activeId){
    const p = data.projects.find(x=>x.id === activeId);
    if(!p){ container.innerHTML = '<p>Project not found.</p>'; return; }

    // Render large project detail
    container.innerHTML = `
      <div class="project-detail">
        <div class="project-detail-left">
          <div class="gallery">
            ${p.screenshots.map((s,idx)=>`<div class="gallery-item"><img src="${s}" data-idx="${idx}" alt="${p.title} screenshot ${idx+1}"/></div>`).join('')}
          </div>
        </div>
        <div class="project-detail-right">
          <h2>${p.title}</h2>
          <p class="lead">${p.description}</p>
          <div class="project-tech">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
          <div class="project-actions">
            <a class="btn primary" href="${p.live_url}">Open</a>
            <a class="btn" href="${p.repo_url}" target="_blank"><i class="fab fa-github"></i> View on GitHub</a>
          </div>
        </div>
      </div>
      <div id="lightbox" class="lightbox" aria-hidden="true"><div class="lightbox-panel"><button id="lbClose">✕</button><img id="lbImg" src="" alt=""/></div></div>
    `;

    // lightbox handlers
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');
    document.querySelectorAll('.gallery img').forEach(img=>{
      img.addEventListener('click', e=>{
        lbImg.src = e.target.src;
        lb.setAttribute('aria-hidden','false');
      })
    });
    lbClose.addEventListener('click', ()=> lb.setAttribute('aria-hidden','true'));
    lb.addEventListener('click', e=>{ if(e.target === lb) lb.setAttribute('aria-hidden','true') });
  } else {
    // render list view (compact)
    data.projects.forEach(p=>{
      const card = document.createElement('article');
      card.className = 'project-card';
      const imgWrap = document.createElement('div');
      imgWrap.className = 'project-img';
      const img = document.createElement('img');
      img.src = p.screenshots[0]; img.alt = p.title; img.style.width='100%'; img.style.height='100%'; img.style.objectFit='cover';
      imgWrap.appendChild(img);
      const info = document.createElement('div'); info.className='project-info';
      info.innerHTML = `<h3>${p.title}</h3><p>${p.description}</p><div class="project-links"><a class="btn" href="${p.live_url}">Live</a><a class="btn" href="${p.repo_url}" target="_blank">Repo</a></div>`;
      card.appendChild(imgWrap); card.appendChild(info); container.appendChild(card);
    });
  }
}

loadProjects().catch(err=>{
  console.error('Failed loading projects', err);
  document.getElementById('projectsList').textContent = 'Failed to load projects.';
});

