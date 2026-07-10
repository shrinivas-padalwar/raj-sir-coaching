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