// Mobile menu
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Active link highlighting
const links = [...menu.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && spy.observe(s));

// Gentle reveal on scroll (skipped if user prefers reduced motion)
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const items = document.querySelectorAll('.section .card, .timeline li');
  items.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

document.getElementById('year').textContent = new Date().getFullYear();