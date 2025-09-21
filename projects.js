async function loadProjects(){
  const res = await fetch('assets/data/projects.json');
  const data = await res.json();
  const container = document.getElementById('projectsList');
  const params = new URLSearchParams(location.search);
  const activeId = params.get('project');

  data.projects.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'project-card';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'project-img';
    const img = document.createElement('img');
    img.src = p.screenshots[0];
    img.alt = p.title;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'project-info';
    info.innerHTML = `
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="project-tech">${p.tech.map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div>
      <div class="project-links">
        <a class="btn" href="${p.live_url}">Live</a>
        <a class="btn" href="${p.repo_url}" target="_blank">Repo</a>
      </div>
    `;

    card.appendChild(imgWrap);
    card.appendChild(info);

    container.appendChild(card);
  });
}

loadProjects().catch(err=>{
  console.error('Failed loading projects', err);
  document.getElementById('projectsList').textContent = 'Failed to load projects.';
});
