document.addEventListener("DOMContentLoaded", function () {
  // ─── Mobile Menu Toggle ───
  const hamburger = document.querySelector('.hamburger-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-nav-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }

  // Close mobile menu on link click
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
          toggleMenu();
        }
      });
    });
  }

  // ─── Active Section Highlighting ───
  const sections = document.querySelectorAll('.guide-section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav a[href^="#"], .mobile-nav a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => sectionObserver.observe(section));

  // ─── Fade-in Animation ───
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  document.querySelectorAll('.fade-element').forEach(el => fadeObserver.observe(el));

  // ─── Copy Server Address ───
  const serverAddr = document.querySelector('.server-address');
  if (serverAddr) {
    serverAddr.style.cursor = 'pointer';
    serverAddr.title = 'Нажми чтобы скопировать';
    serverAddr.addEventListener('click', () => {
      navigator.clipboard.writeText('2b2t.org').then(() => {
        const original = serverAddr.textContent;
        serverAddr.textContent = 'Скопировано!';
        serverAddr.style.fontSize = '36px';
        setTimeout(() => {
          serverAddr.textContent = original;
          serverAddr.style.fontSize = '';
        }, 1200);
      });
    });
  }
});
