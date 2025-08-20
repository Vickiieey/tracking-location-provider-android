const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');
if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });
}

const toast = document.getElementById('toast');
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
}

document.querySelectorAll('.quick-add').forEach(button => {
  button.addEventListener('click', () => {
    const sku = button.getAttribute('data-sku');
    showToast(`Added to cart · ${sku}`);
  });
});

const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

const subscribeForm = document.querySelector('.subscribe');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    showToast(`Subscribed: ${email}`);
    subscribeForm.reset();
  });
}

