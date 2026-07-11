// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click', ()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el=>{
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Restart hero burst animation on tap/click — gather to center first, then re-burst
const heroStage = document.querySelector('.hero-stage');
if(heroStage){
  let isGathering = false;
  heroStage.addEventListener('click', ()=>{
    if(isGathering) return;
    isGathering = true;
    const syms = heroStage.querySelectorAll('.sym');
    const gatherDuration = 550; // ms

    syms.forEach(s => {
      // freeze each symbol exactly where its current animation frame is
      const computed = getComputedStyle(s);
      const frozenTransform = computed.transform;
      const frozenOpacity = computed.opacity;

      s.style.animationName = 'none';
      s.style.transform = frozenTransform;
      s.style.opacity = frozenOpacity;
      void s.offsetWidth; // force reflow so the frozen state registers before transitioning

      s.style.transition = `transform ${gatherDuration}ms ease-in, opacity ${gatherDuration}ms ease-in`;
      s.style.transform = 'translate(calc(var(--dx) * -1), calc(var(--dy) * -1)) scale(0.15)';
      s.style.opacity = '0';
    });

    setTimeout(()=>{
      syms.forEach(s => {
        s.style.transition = '';
        s.style.transform = '';
        s.style.opacity = '';
        s.style.animationName = ''; // resume the class-driven infinite loop, restarting from 0%
      });
      isGathering = false;
    }, gatherDuration);
  });
}

// Mobile nav toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if(menuToggle && navLinks){
  menuToggle.addEventListener('click', ()=>{
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link=>{
    link.addEventListener('click', ()=>{
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// Inquiry form -> WhatsApp
document.getElementById('inquiryForm').addEventListener('submit', function(e){
  e.preventDefault();
  const f = e.target;
  const studentName = f.studentName.value.trim();
  const parentName = f.parentName.value.trim();
  const mobile = f.mobile.value.trim();
  const studentClass = f.studentClass.value;
  const subject = f.subject.value;
  const message = f.message.value.trim();

  const text =
`New enquiry from Raj Sir's Coaching Classes website:
Student: ${studentName}
Parent: ${parentName}
Mobile: ${mobile}
Class: ${studentClass}
Interested in: ${subject}
Message: ${message || '-'}`;

  const url = `https://wa.me/919405910910?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
});