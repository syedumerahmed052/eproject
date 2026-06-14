/* ── shared.js ─ Nobel Prize Pakistan ────────────────────── */

/* Hamburger */
function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const ul  = document.querySelector('nav ul');
  if (!btn || !ul) return;
  btn.addEventListener('click', () => {
    ul.classList.toggle('open');
    btn.classList.toggle('open');
  });
}

/* Active nav link */
function initActiveNav() {
  const links = document.querySelectorAll('nav ul li a');
  const page  = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* Scroll reveal */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* Counting animation for stat numbers */
function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let start    = 0;
      const step   = target / 60;
      const tick   = () => {
        start = Math.min(start + step, target);
        el.textContent = Math.round(start) + suffix;
        if (start < target) requestAnimationFrame(tick);
      };
      tick();
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => obs.observe(n));
}

/* Hero Carousel — order matches the .slide elements in index.html:
   1. Dr. Abdus Salam (Physics, 1979)
   2. Malala Yousafzai (Peace, 2014)
   3. Albert Einstein (Physics, 1921)
   4. Marie Curie (Physics & Chemistry, 1903 & 1911) */
function initCarousel() {
  const slides   = document.querySelectorAll('.slide');
  const dots     = document.querySelectorAll('.dot');
  const portraits = document.querySelectorAll('.hero-portrait');
  const caption  = document.getElementById('carousel-caption');
  if (!slides.length) return;

  const captions = [
    'Dr. Abdus Salam — Nobel Prize in Physics 1979',
    'Malala Yousafzai — Nobel Peace Prize 2014',
    'Albert Einstein — Nobel Prize in Physics 1921',
    'Marie Curie — Nobel Prize in Physics 1903 & Chemistry 1911',
  ];

  let idx = 0;
  let timer;

  function goTo(n) {
    slides[idx].classList.remove('active');
    if (dots[idx]) dots[idx].classList.remove('active');
    if (portraits[idx]) portraits[idx].classList.remove('active');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('active');
    if (dots[idx]) dots[idx].classList.add('active');
    if (portraits[idx]) portraits[idx].classList.add('active');
    if (caption) caption.textContent = captions[idx];
  }

  function next() { goTo(idx + 1); }

  function start() { timer = setInterval(next, 4500); }
  function stop()  { clearInterval(timer); }

  goTo(0);
  start();

  dots.forEach((d, i) => d.addEventListener('click', () => { stop(); goTo(i); start(); }));

  /* prev / next arrows */
  document.querySelector('.carousel-prev')?.addEventListener('click', () => { stop(); goTo(idx - 1); start(); });
  document.querySelector('.carousel-next')?.addEventListener('click', () => { stop(); goTo(idx + 1); start(); });
}

/* FAQ accordion */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
}

/* Contact form */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#0f7a3c';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initActiveNav();
  initReveal();
  initCounters();
  initCarousel();
  initFAQ();
  initContactForm();
});