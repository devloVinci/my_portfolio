async function loadProjects(){
            try {
               
                const res = await fetch('assets/data/projects.json');
                const data = await res.json();
                const container = document.getElementById('projectsList');
                const params = new URLSearchParams(location.search);
                const activeId = params.get('project');

                if(activeId){
                    const p = data.projects.find(x => x.id === activeId);
                    if(!p){ 
                        container.innerHTML = '<div class="error"><p>Project not found.</p></div>'; 
                        return; 
                    }

                    // Render large project detail
                    container.innerHTML = `
                        <div class="project-detail">
                            <div class="project-detail-left">
                                <div class="gallery">
                                    ${p.screenshots.map((s, idx) => `
                                        <div class="gallery-item">
                                            <img src="${s}" data-idx="${idx}" alt="${p.title} screenshot ${idx+1}"/>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            <div class="project-detail-right">
                                <h2>${p.title}</h2>
                                <p class="lead centered">${p.description}</p>
                                <div class="project-tech">
                                    ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                                </div>
                                <div class="project-actions">
                                    <a class="btn" href="${p.repo_url}" target="_blank">
                                        <i class="fab fa-github"></i> View on GitHub
                                    </a>
                                    <a class="btn" href="projects.html">
                                        <i class="fas fa-list"></i> All Projects
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="lightbox" class="lightbox" aria-hidden="true">
                            <div class="lightbox-panel">
                                <button id="lbClose">✕</button>
                                <img id="lbImg" src="" alt=""/>
                            </div>
                        </div>
                    `;

                    // Lightbox handlers
                    const lb = document.getElementById('lightbox');
                    const lbImg = document.getElementById('lbImg');
                    const lbClose = document.getElementById('lbClose');
                    
                    document.querySelectorAll('.gallery img').forEach(img => {
                        img.addEventListener('click', e => {
                            lbImg.src = e.target.src;
                            lb.setAttribute('aria-hidden', 'false');
                            document.body.style.overflow = 'hidden'; // Prevent scrolling
                        });
                    });
                    
                    lbClose.addEventListener('click', () => {
                        lb.setAttribute('aria-hidden', 'true');
                        document.body.style.overflow = ''; // Re-enable scrolling
                    });
                    
                    lb.addEventListener('click', e => {
                        if(e.target === lb) {
                            lb.setAttribute('aria-hidden', 'true');
                            document.body.style.overflow = ''; // Re-enable scrolling
                        }
                    });
                    
                    // Close lightbox with Escape key
                    document.addEventListener('keydown', e => {
                        if(e.key === 'Escape' && lb.getAttribute('aria-hidden') === 'false') {
                            lb.setAttribute('aria-hidden', 'true');
                            document.body.style.overflow = ''; // Re-enable scrolling
                        }
                    });
                } else {
                    // Render list view (compact)
                    container.innerHTML = `
                        <div class="projects-grid">
                            ${data.projects.map(p => `
                                <article class="project-card">
                                    <div class="project-img">
                                        <img src="${p.screenshots[0]}" alt="${p.title}" />
                                    </div>
                                    <div class="project-info">
                                        <h3>${p.title}</h3>
                                        <p class="lead centered">${p.description}</p>
                                        <div class="project-links">
                                            <a class="btn" href="projects.html?project=${p.id}">
                                                <i class="fas fa-info-circle"></i> View Details
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            `).join('')}
                        </div>
                    `;
                }
            } catch (err) {
                console.error('Failed loading projects', err);
                document.getElementById('projectsList').innerHTML = `
                    <div class="error">
                        <p>Failed to load projects. Please try again later.</p>
                    </div>
                `;
            }
        }

        // Load projects when page is ready
        document.addEventListener('DOMContentLoaded', loadProjects);