export const renderAbout = (config) => {
  const about = config.site.about || {};
  return `
    <section class="about-section">
      <div class="container">
        <h2 class="section-title">${about.heading || 'About Us'}</h2>
        <div class="about-content">
          ${(about.paragraphs || []).map(p => `<p class="about-para">${p}</p>`).join('')}
          
          <div class="about-objectives" style="${(!about.objectives || about.objectives.length === 0) ? 'display: none;' : ''}">
            <h3 class="objectives-title">${about.objectivesHeading || ''}</h3>
            <ul class="objectives-list">
              ${(about.objectives || []).map(obj => `<li>${obj}</li>`).join('')}
            </ul>
          </div>

          <div class="about-takeaways" style="${(!about.takeaways || about.takeaways.length === 0) ? 'display: none;' : ''}">
            <h3 class="takeaways-title">Key Takeaways of AutoCom-26</h3>
            <ul class="takeaways-list">
              ${(about.takeaways || []).map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const renderRegistration = (data) => {
  if (!data) return '<section class="section-placeholder"><div class="container"><p>Registration details unavailable.</p></div></section>';

  const { importantDates, fees, bankDetails } = data;

  return `
    <section class="registration-section">
      <div class="container">
        <h2 class="section-title">Registration</h2>
        
        <div class="registration-grid">
          <!-- Important Dates -->
          <div class="registration-card dates-card">
            <h3 class="card-title">📅 Important Dates</h3>
            <ul class="dates-list">
              ${importantDates.map(d => `
                <li>
                  <span class="date-label">${d.label}</span>
                  <span class="date-value">${d.date}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Registration Fees -->
          <div class="registration-card fees-card">
            <h3 class="card-title">💰 Registration Fees</h3>
            <div class="table-responsive">
              <table class="fees-table">
                <thead>
                  <tr>
                    ${fees.columns.map(col => `<th>${col}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${fees.rows.map(row => `
                    <tr>
                      <td>${row.category}</td>
                      <td class="price">${row.indian}</td>
                      <td class="price">${row.international}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Bank Details -->
          <div class="registration-card bank-card">
            <h3 class="card-title">🏦 Bank / Payment Details</h3>
            <div class="table-responsive">
              <table class="bank-table">
                <tbody>
                  <tr>
                    <th>Beneficiary Name</th>
                    <td>${bankDetails.beneficiaryName}</td>
                  </tr>
                  <tr>
                    <th>Bank Name</th>
                    <td>${bankDetails.bankName}</td>
                  </tr>
                  <tr>
                    <th>Branch</th>
                    <td>${bankDetails.branch}</td>
                  </tr>
                  <tr>
                    <th>IFSC Code</th>
                    <td class="code">${bankDetails.ifscCode}</td>
                  </tr>
                  <tr>
                    <th>Account Number</th>
                    <td class="code">${bankDetails.accountNumber}</td>
                  </tr>
                  <tr>
                    <th>Branch Code</th>
                    <td class="code">${bankDetails.branchCode}</td>
                  </tr>
                  <tr>
                    <th>Bank Address</th>
                    <td>${bankDetails.bankAddress}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

export const renderGuidelines = (data, config) => {
  if (!data) return '<section class="section-placeholder"><div class="container"><p>Guidelines unavailable.</p></div></section>';

  return `
    <section class="guidelines-section">
      <div class="container">
        <h2 class="section-title">Conference Guidelines</h2>
        
        <div class="guidelines-grid">
          ${data.sections.map(section => `
            <div class="guidelines-card">
              <h3 class="card-title">${section.title}</h3>
              <ul class="guidelines-list">
                ${section.items.map(item => `<li>${injectMetadata(item, config)}</li>`).join('')}
              </ul>
              
              ${section.subsections ? section.subsections.map(sub => `
                <div class="guidelines-subsection">
                  <h4 class="subsection-title">${sub.title}</h4>
                  <ul class="guidelines-list compact">
                    ${sub.items.map(item => `<li>${injectMetadata(item, config)}</li>`).join('')}
                  </ul>
                </div>
              `).join('') : ''}

              ${section.actions ? `
                <div class="card-actions">
                  ${section.actions.map(act => `
                    <a href="${injectMetadata(act.url, config)}" class="btn btn-outline btn-sm" target="_blank">
                      ${act.text}
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
};

export const renderHero = (config) => `
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <span class="tag">${config.site.year} | ${config.site.location}</span>
        ${(config.site.showIEEE !== false && config.site.ieeeRecordNumber) ? `<span class="tag ieee-tag">IEEE Record Number: ${config.site.ieeeRecordNumber}</span>` : ''}
        <h1>${config.site.fullName}</h1>
        <p class="tagline">${config.site.tagline}</p>
        <p class="dates">${config.site.dates}</p>
        ${config.site.mode ? `<p class="hero-mode">Conference Mode: <strong>${config.site.mode}</strong></p>` : ''}
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="window.navigate('registration')">Register Now</button>
          <button class="btn btn-outline" onclick="window.navigate('cfp')">Call for Papers</button>
        </div>
      </div>
    </div>
  </section>
`;

export const renderSpeakers = (speakers) => `
  <section class="speakers">
    <div class="container">
      <h2 class="section-title">Distinguished Speakers</h2>
      <div class="data-grid">
        ${speakers.map(s => `
          <div class="card speaker-card">
            <div class="speaker-role">${s.role}</div>
            <h3>${s.name}</h3>
            <p class="affiliation">${s.affiliation}</p>
            <p class="bio">${s.bio}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

export const renderTracks = (tracks) => `
  <section class="tracks">
    <div class="container">
      <h2 class="section-title">Technical Tracks</h2>
      <div class="data-grid tracks-grid">
        ${tracks.map(t => `
          <div class="card track-card">
            <div class="track-header">
              <div class="track-id">${t.id}</div>
              <h3>${t.title}</h3>
            </div>
            ${t.description ? `<p class="track-desc">${t.description}</p>` : ''}
            <div class="track-topics">
              <h4>Topics include:</h4>
              <ul>
                ${t.topics.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
`;

export const renderCommittees = (data) => {
  const categories = data.categories;

  return `
    <section class="committee">
      <div class="container">
        <h2 class="section-title">Committee</h2>
        
        ${categories.map(cat => `
          <div class="committee-category" id="cat-${cat.id}">
            <h3 class="category-title">${cat.title}</h3>
            
            ${cat.roles ? cat.roles.map(role => `
              <div class="role-group">
                <h4 class="role-title">${role.role_name}</h4>
                <div class="member-grid">
                  ${role.members.map(m => `
                    <div class="member-card">
                      <h5>${m.name}</h5>
                      <p>${m.affiliation}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('') : ''}
            
            ${cat.subgroups ? `
              <div class="subgroups-container">
                ${cat.subgroups.map(sub => `
                  <div class="committee-subgroup">
                    <h4 class="subgroup-title">${sub.name}</h4>
                    <div class="member-list-compact">
                      ${sub.members.map(m => `
                        <div class="compact-member">
                          <strong>${m.name}</strong>, <span class="affiliation-text">${m.affiliation}</span>
                        </div>
                      `).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cat.members ? `
              <div class="member-grid">
                ${cat.members.map(m => `
                  <div class="member-card">
                    <h5>${m.name}</h5>
                    <p>${m.affiliation}</p>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
        
      </div>
    </section>
  `;
};

export const renderPartners = (config) => {
  const branding = config.site.branding || {};
  if (!branding.logo_ieee || config.site.showIEEE === false) return '';

  return `
    <section class="partner-strip">
      <div class="container">
        <h3 class="category-title" style="border-bottom: none; margin-bottom: 0;">Technically Supported By</h3>
        <div class="partner-logos">
          <div class="partner-item">
            <img src="${branding.logo_ieee}" alt="IEEE UP Section" class="logo-partner">
            <p style="margin-top: 1rem; color: var(--text-muted); font-weight: 600;">IEEE Uttar Pradesh Section</p>
          </div>
        </div>
      </div>
    </section>
  `;
};

// Utility to replace placeholders in content
const injectMetadata = (text, config) => {
  if (typeof text !== 'string') return text;

  let processed = text
    .replace(/{{CONF_TITLE}}/g, config.site.title)
    .replace(/{{CONF_FULL_NAME}}/g, config.site.fullName)
    .replace(/{{CONF_YEAR}}/g, config.site.year)
    .replace(/{{CONF_EDITION}}/g, config.site.edition)
    .replace(/{{CONF_EMAIL}}/g, config.contact.email)
    .replace(/{{CONF_LOCATION}}/g, config.site.location)
    .replace(/{{CONF_DATES}}/g, config.site.dates);

  // Sanitize IEEE mentions if hidden
  if (config.site.showIEEE === false) {
    processed = processed
      .replace(/IEEE Xplore/gi, 'indexed proceedings')
      .replace(/IEEE format/gi, 'standard format')
      .replace(/IEEE/g, '');
  }

  return processed;
};

export const renderFooter = (config) => `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>${config.site.title}</h3>
          <p>${config.site.fullName}</p>
        </div>
        <div class="footer-contact">
          <h4>Contact Us</h4>
          <p>${config.contact.email}</p>
          <p>${config.contact.address}</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${new Date().getFullYear()} ${config.site.shortName || 'AUTOCOM'}. All rights reserved.
      </div>
    </div>
  </footer>
`;

export const renderCFP = (data, config) => `
  <section class="cfp-section">
    <div class="container">
      <h2 class="section-title">${data.title}</h2>
      <div class="cfp-content">
        <h3 class="cfp-subtitle">${injectMetadata(data.subtitle, config)}</h3>
        <p class="cfp-description">${injectMetadata(data.description, config)}</p>
        
        <div class="cfp-tracks">
          <h4>${data.tracksHeading}</h4>
          <ul class="tracks-list">
            ${data.tracks.map(track => `<li>${track}</li>`).join('')}
          </ul>
        </div>
        
        <p class="cfp-closing">${injectMetadata(data.closing, config)}</p>
        
        <div class="cfp-awards">
          <h4>${data.awards.heading}</h4>
          <ul class="awards-list">
            ${data.awards.items.map(award => `<li>${award}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  </section>
`;

export const renderGallery = (data) => {
  const conferencePhotos = data.conference || [];
  const nearbyPhotos = data.nearby || [];
  let autoplayIntervals = {};

  // Define tab switching function in global scope
  window.switchGalleryTab = (category) => {
    // Update button states
    document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.gallery-tab-btn[onclick*="${category}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update content visibility
    document.querySelectorAll('.gallery-category-content').forEach(content => {
      content.classList.remove('active');
    });
    const activeContent = document.getElementById(`gallery-${category}`);
    if (activeContent) activeContent.classList.add('active');

    // Handle autoplay: stop all and start current
    stopAllAutoplay();
    startAutoplay(category);
  };

  // Define scroll function in global scope
  window.scrollGallery = (category, direction) => {
    const slider = document.querySelector(`#gallery-${category} .gallery-slider`);
    if (!slider) return;

    const items = slider.querySelectorAll('.gallery-item');
    if (items.length === 0) return;

    // Calculate item width including gap
    const itemWidth = items[0].offsetWidth + parseInt(window.getComputedStyle(slider).gap);
    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === 'next') {
      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    } else {
      if (slider.scrollLeft <= 10) {
        slider.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      }
    }
  };

  const startAutoplay = (category) => {
    if (autoplayIntervals[category]) return;
    autoplayIntervals[category] = setInterval(() => {
      window.scrollGallery(category, 'next');
    }, 4500); // Slightly slower for better experience
  };

  const stopAutoplay = (category) => {
    if (autoplayIntervals[category]) {
      clearInterval(autoplayIntervals[category]);
      delete autoplayIntervals[category];
    }
  };

  const stopAllAutoplay = () => {
    Object.keys(autoplayIntervals).forEach(cat => stopAutoplay(cat));
  };

  // Expose for hover events
  window.pauseGallery = (category) => stopAutoplay(category);
  window.resumeGallery = (category) => {
    const activeContent = document.getElementById(`gallery-${category}`);
    if (activeContent && activeContent.classList.contains('active')) {
      startAutoplay(category);
    }
  };

  // Initialize first autoplay
  setTimeout(() => startAutoplay('conference'), 2000);

  return `
    <section class="gallery-section">
      <div class="container">
        <h2 class="section-title">Photo Gallery</h2>
        
        <div class="gallery-tabs">
          <button class="gallery-tab-btn active" onclick="switchGalleryTab('conference')">Conference Gallery</button>
          ${nearbyPhotos.length > 0 ? `<button class="gallery-tab-btn" onclick="switchGalleryTab('nearby')">Nearby Places to Visit</button>` : ''}
        </div>

        <div id="gallery-conference" class="gallery-category-content active">
          <div class="slider-container" 
               onmouseenter="pauseGallery('conference')" 
               onmouseleave="resumeGallery('conference')">
            <button class="slider-nav-btn prev" onclick="scrollGallery('conference', 'prev')">❮</button>
            <div class="gallery-slider">
              ${conferencePhotos.map(p => `
                <div class="gallery-item">
                  <img src="${p.url}" alt="${p.caption}" loading="lazy">
                  <div class="gallery-overlay">
                    <p>${p.caption}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="slider-nav-btn next" onclick="scrollGallery('conference', 'next')">❯</button>
          </div>
        </div>
        
        ${nearbyPhotos.length > 0 ? `
          <div id="gallery-nearby" class="gallery-category-content">
            <div class="slider-container"
                 onmouseenter="pauseGallery('nearby')" 
                 onmouseleave="resumeGallery('nearby')">
              <button class="slider-nav-btn prev" onclick="scrollGallery('nearby', 'prev')">❮</button>
              <div class="gallery-slider">
                ${nearbyPhotos.map(p => `
                  <div class="gallery-item">
                    <img src="${p.url}" alt="${p.caption}" loading="lazy">
                    <div class="gallery-overlay">
                      <p>${p.caption}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
              <button class="slider-nav-btn next" onclick="scrollGallery('nearby', 'next')">❯</button>
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;
};





export const renderContact = (config) => {
  const contact = config.contact || {};
  return `
    <section class="contact-section">
      <div class="container">
        <h2 class="section-title">Contact Us</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-card">
              <div class="card-icon">📍</div>
              <h4>Local Address</h4>
              <p>${contact.address}</p>
            </div>
            <div class="contact-card">
              <div class="card-icon">📧</div>
              <h4>Email Support</h4>
              <p><a href="mailto:${contact.email}">${contact.email}</a></p>
            </div>
            <div class="contact-card">
              <div class="card-icon">📞</div>
              <h4>Phone Number</h4>
              <p>${contact.phone}</p>
            </div>
          </div>
          
          <div class="contact-queries">
            <h3 class="queries-title">Specific Queries</h3>
            ${(contact.queries || []).map(q => `
              <div class="query-group">
                <h4>${q.type}</h4>
                <ul>
                  ${q.contacts.map(c => `<li>${c}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
};
