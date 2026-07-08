// ─── MOBILE NAV TOGGLE ───────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// close mobile menu after tapping a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// ─── FAQ ACCORDION ───────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    // close all others (accordion behavior)
    document.querySelectorAll('.faq-item').forEach(other => other.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ─── SCROLL REVEAL ───────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.course-card, .icon-item, .results-panel, .faq-item, .contact-info, .map-container'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ─── KEEP WHATSAPP BUTTON ABOVE FOOTER ───────────────
const whatsappBtn = document.getElementById('whatsappBtn');
const siteFooter = document.getElementById('siteFooter');

function getBaseGap() {
  return window.innerWidth <= 620 ? 16 : 24; // matches the CSS breakpoint values
}

function adjustWhatsappPosition() {
  const footerRect = siteFooter.getBoundingClientRect();
  const overlap = window.innerHeight - footerRect.top; // how far the footer creeps into the viewport
  const baseGap = getBaseGap();
  if (overlap > 0) {
    whatsappBtn.style.bottom = (overlap + baseGap) + 'px';
  } else {
    whatsappBtn.style.bottom = baseGap + 'px';
  }
}

window.addEventListener('scroll', adjustWhatsappPosition);
window.addEventListener('resize', adjustWhatsappPosition);
adjustWhatsappPosition(); // run once on load

// ─── WHATSAPP BUTTON: TAP TO EXPAND (mobile only) ────
whatsappBtn.addEventListener('click', (e) => {
  const isMobile = window.innerWidth <= 620;
  if (!isMobile) return; // desktop always shows the label, no special handling needed

  if (!whatsappBtn.classList.contains('expanded')) {
    // first tap: just reveal the label, don't navigate yet
    e.preventDefault();
    whatsappBtn.classList.add('expanded');
  }
  // second tap while already expanded: let the link open WhatsApp as normal
});

// tapping anywhere else on the page collapses it back to icon-only
document.addEventListener('click', (e) => {
  if (whatsappBtn.classList.contains('expanded') && !whatsappBtn.contains(e.target)) {
    whatsappBtn.classList.remove('expanded');
  }
});