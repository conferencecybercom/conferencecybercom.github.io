import '/src/styles/style.css'; // Deployment Trigger: Absolute paths for root hosting
import { renderAbout, renderRegistration, renderGuidelines, renderHero, renderSpeakers, renderTracks, renderCommittees, renderPartners, renderFooter, renderCFP, renderGallery, renderContact } from './scripts/renderer.js';

let siteConfig = null;
let currentPath = 'home';

async function fetchData(file) {
  try {
    // Cache busting with timestamp
    const response = await fetch(`/data/${file}.json?v=${new Date().getTime()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error(`Failed to fetch ${file}:`, e);
    throw e;
  }
}

async function init() {
  const app = document.getElementById('app');
  try {
    siteConfig = await fetchData('config');
    await renderApp();
  } catch (error) {
    console.error("Initialization failed:", error);
    if (app) {
      app.innerHTML = `
        <div class="container" style="padding: 5rem; text-align: center; color: #1e293b;">
          <h1 style="color: #0f172a;">Initialization Error</h1>
          <p>We couldn't load the site configuration. Please try refreshing.</p>
          <p><small>${error.message}</small></p>
        </div>
      `;
    }
  }
}

async function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  // 1. Navbar markup
  let navHtml = '';
  if (siteConfig) {
    const branding = siteConfig.site.branding || {};
    navHtml = `
      <nav class="glass-nav">
        <div class="container nav-content">
          <div class="nav-logos" onclick="navigate('home')" style="cursor: pointer;">
            ${branding.logo_conference ? `<img src="${branding.logo_conference}" alt="AutoCom" class="logo-nav">` : ''}
            ${branding.logo_university ? `<img src="${branding.logo_university}" alt="GEHU" class="logo-nav" style="border-left: 1px solid var(--border); padding-left: 1rem; margin-left: 0.5rem;">` : ''}
            ${(siteConfig.site.showIEEE !== false && branding.logo_ieee) ? `<img src="${branding.logo_ieee}" alt="IEEE UP Section" class="logo-nav" style="border-left: 1px solid var(--border); padding-left: 1rem; margin-left: 0.5rem;">` : ''}
          </div>
          <ul class="nav-links" id="nav-links">
            ${siteConfig.navigation.map(nav => `
              <li><a class="${currentPath === nav.path ? 'active' : ''}" 
                     onclick="navigate('${nav.path}')">${nav.label}</a></li>
            `).join('')}
          </ul>
          <div class="mobile-toggle" id="mobile-toggle" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    `;

    // Add toggle function to global scope
    window.toggleMenu = () => {
      const links = document.getElementById('nav-links');
      const toggle = document.getElementById('mobile-toggle');
      if (links && toggle) {
        links.classList.toggle('mobile-open');
        toggle.classList.toggle('active');
      }
    };
  }

  // 2. Initial Structural Layout (Navbar + Main + Placeholder Footer)
  app.innerHTML = `
    ${navHtml}
    <main id="main-content">
       <div class="container" style="padding: 5rem 0; text-align: center; color: #64748b;">
         <p>Preparing content...</p>
       </div>
    </main>
    <div id="footer-slot"></div>
  `;

  const mainContent = document.getElementById('main-content');
  const footerSlot = document.getElementById('footer-slot');

  if (siteConfig) {
    footerSlot.innerHTML = renderFooter(siteConfig);
    document.title = `${siteConfig.site.title} | ${currentPath.toUpperCase()}`;
  }

  // 3. Page Rendering
  try {
    if (currentPath === 'home') {
      // RENDERING HERO IMMEDIATELY (no await for speakers here)
      mainContent.innerHTML = renderHero(siteConfig) + renderPartners(siteConfig);

      // Show Coming Soon for speakers on home page
      mainContent.insertAdjacentHTML('beforeend', `
        <section class="speakers">
          <div class="container" style="text-align: center; padding: 3rem 0;">
            <h2 class="section-title">Keynote Speakers</h2>
            <div class="coming-soon-banner">
              <h3>Coming Soon</h3>
              <p>We are currently finalizing our lineup of world-class speakers. Stay tuned for exciting announcements!</p>
            </div>
          </div>
        </section>
      `);

    } else {
      // Other pages
      let pageHtml = '';
      switch (currentPath) {
        case 'about':
          pageHtml = renderAbout(siteConfig);
          break;
        case 'cfp':
          const cfpData = await fetchData('cfp');
          pageHtml = renderCFP(cfpData, siteConfig);
          break;
        case 'speakers':
          pageHtml = `
            <section class="speakers-page">
              <div class="container" style="text-align: center; padding: 4rem 0;">
                <h2 class="section-title">Keynote Speakers</h2>
                <div class="coming-soon-banner" style="max-width: 600px; margin: 0 auto; background: var(--surface); padding: 4rem; border-radius: 1.5rem; border: 1px dashed var(--accent);">
                  <span style="font-size: 4rem; display: block; margin-bottom: 1.5rem;">🎙️</span>
                  <h3>Coming Soon</h3>
                  <p style="color: var(--text-muted); font-size: 1.1rem; margin-top: 1rem;">
                    We are currently in the process of inviting leading experts and pioneers in the fields of Automation and Computation. 
                    The full schedule and list of speakers will be announced shortly.
                  </p>
                </div>
              </div>
            </section>
          `;
          break;
        case 'tracks':
          const tData = await fetchData('tracks');
          pageHtml = renderTracks(tData);
          break;
        case 'committees':
          const cData = await fetchData('committee');
          pageHtml = renderCommittees(cData);
          break;
        case 'registration':
          const rData = await fetchData('registration');
          pageHtml = renderRegistration(rData);
          break;
        case 'gallery':
          const galleryData = await fetchData('gallery');
          pageHtml = renderGallery(galleryData);
          break;
        case 'contact':
          pageHtml = renderContact(siteConfig);
          break;
        case 'guidelines':
          const gData = await fetchData('guidelines');
          pageHtml = renderGuidelines(gData, siteConfig);
          break;
        default:
          pageHtml = `
            <div class="container" style="padding: 5rem 0; text-align: center;">
              <h2>${currentPath.toUpperCase()}</h2>
              <p>Section coming soon.</p>
            </div>`;
      }
      mainContent.innerHTML = pageHtml;
    }
  } catch (err) {
    console.error("Rendering failed:", err);
    mainContent.innerHTML = `
      <div class="container" style="padding: 5rem 0; text-align: center;">
        <h2>Error loading page</h2>
        <p>${err.message}</p>
      </div>`;
  }
}

window.navigate = (path) => {
  currentPath = path;
  window.scrollTo(0, 0);

  // Close mobile menu if open
  const links = document.getElementById('nav-links');
  const toggle = document.getElementById('mobile-toggle');
  if (links) links.classList.remove('mobile-open');
  if (toggle) toggle.classList.remove('active');

  renderApp();
};

init();
