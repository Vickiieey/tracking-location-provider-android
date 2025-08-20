const currentYearElement = document.getElementById('year');
if (currentYearElement) {
  currentYearElement.textContent = String(new Date().getFullYear());
}

// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggleButton && siteNav) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!isOpen));
    siteNav.style.display = isOpen ? 'none' : 'flex';
    siteNav.style.flexDirection = 'column';
    siteNav.style.gap = '12px';
  });
}

// Minimal cart feedback
const cartButtons = document.querySelectorAll('.add-to-cart');
cartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.getAttribute('data-name');
    button.textContent = 'Added';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = 'Add';
      button.disabled = false;
    }, 1200);
    // Simple toast
    showToast(`${productName} added to cart`);
  });
});

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '16px';
  toast.style.right = '16px';
  toast.style.padding = '10px 14px';
  toast.style.background = 'rgba(21,25,45,0.9)';
  toast.style.color = '#eef1f7';
  toast.style.border = '1px solid rgba(255,255,255,0.08)';
  toast.style.borderRadius = '999px';
  toast.style.zIndex = '50';
  toast.style.boxShadow = '0 10px 24px rgba(0,0,0,0.4)';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 1600);
}

// Signup form
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  const note = signupForm.querySelector('.form-note');
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const email = String(formData.get('email') || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (note) note.textContent = 'Please enter a valid email address.';
      return;
    }
    if (note) note.textContent = 'Thanks! We\'ll be in touch soon.';
    (signupForm.querySelector('button[type="submit"]')).disabled = true;
  });
}

