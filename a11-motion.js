(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('a11-motion-ready');

  // Responsive, keyboard-accessible navigation shared by every public route.
  const header = document.querySelector('.masthead');
  const nav = header?.querySelector('nav');
  const brand = header?.querySelector('a[aria-label="A11 home"]');
  if (header && nav && brand) {
    nav.id = nav.id || 'a11-primary-navigation';
    const toggle = document.createElement('button');
    toggle.className = 'a11-menu-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
    }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
      }
    });
    header.insertBefore(toggle, nav);
  }

  const progress = document.createElement('div');
  progress.className = 'a11-reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  let ticking = false;
  const updateProgress = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, value)) + ')';
      ticking = false;
    });
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.home-page > section, .surface-main > section, .surface-grid > *, .architecture-grid > *, .builder-grid > *, .home-route-grid > *, .home-bento > *, .doc-list > *, .gate-grid > *');
  targets.forEach((el, index) => {
    el.classList.add('a11-reveal');
    if (el.matches('.home-bento > *, .home-route-grid > *, .surface-grid > *, .architecture-grid > *, .builder-grid > *')) {
      el.style.setProperty('--a11-delay', Math.min(index % 6, 5) * 70 + 'ms');
    }
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(el => observer.observe(el));
})();