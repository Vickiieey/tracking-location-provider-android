const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    siteNav.style.display = open ? 'none' : 'flex';
    siteNav.style.flexDirection = 'column';
    siteNav.style.gap = '10px';
  });
}

// New task dialog
const newTaskBtn = document.getElementById('newTaskBtn');
const newTaskDialog = document.getElementById('newTaskDialog');
const newTaskForm = document.getElementById('newTaskForm');
const taskList = document.getElementById('taskList');

if (newTaskBtn && newTaskDialog && newTaskForm && taskList && 'showModal' in HTMLDialogElement.prototype) {
  newTaskBtn.addEventListener('click', () => newTaskDialog.showModal());
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(newTaskForm);
    const title = String(formData.get('title') || '').trim();
    if (!title) return;
    const li = document.createElement('li');
    li.innerHTML = `<label><input type="checkbox"/> ${escapeHtml(title)}</label>`;
    taskList.prepend(li);
    newTaskDialog.close();
    newTaskForm.reset();
  });
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, m => map[m]);
}

