const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      menuToggle.textContent = '☰';
    });
  });
}

document.querySelectorAll('[data-product]').forEach((card) => {
  card.addEventListener('click', () => {
    const interest = document.querySelector('#enquiry-type');
    if (interest) {
      const product = card.dataset.product;
      const matchingOption = [...interest.options].find((option) => option.textContent.toLowerCase().includes(product.toLowerCase().split(' ')[0]));
      if (matchingOption) interest.value = matchingOption.value;
    }
});
});

document.querySelectorAll('[data-enquiry]').forEach((link) => {
  link.addEventListener('click', () => {
    const interest = document.querySelector('#enquiry-type');
    if (!interest) return;
    const desired = link.dataset.enquiry;
    const matchingOption = [...interest.options].find((option) => option.textContent === desired);
    if (matchingOption) interest.value = matchingOption.value;
  });
});

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const name = String(formData.get('name') || '').trim();
    const interest = String(formData.get('interest') || 'Saree enquiry');
    const message = String(formData.get('message') || '').trim();
    const text = `Hello Anega Sarees! My name is ${name}.\nI'm interested in: ${interest}.\n${message ? `My message: ${message}\n` : ''}Please share more details. Thank you.`;
    // Update this number if the business wants enquiries sent to a different WhatsApp contact.
    const whatsappNumber = '919445706601';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();
