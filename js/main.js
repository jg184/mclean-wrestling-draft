/* McLean Highlanders Wrestling - Main JS */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Mark Active Nav Link ---
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Accordion ---
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      // Optional: close siblings
      const parent = header.closest('.accordion-group');
      if (parent) {
        parent.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
        parent.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
      }
      if (!isOpen) {
        body.classList.add('open');
        header.classList.add('active');
      }
    });
  });

  // --- Tabs ---
  document.querySelectorAll('.tab-nav').forEach(tabNav => {
    const buttons = tabNav.querySelectorAll('.tab-btn');
    const container = tabNav.parentElement;
    const panels = container.querySelectorAll('.tab-panel');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  });

  // --- Contact Form (basic) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const subject = encodeURIComponent(data.get('subject') || 'Website Inquiry');
      const body = encodeURIComponent(
        `Name: ${data.get('name')}\n\n${data.get('message')}`
      );
      window.location.href = `mailto:mcleanwrestling@gmail.com?subject=${subject}&body=${body}`;
    });
  }

});
