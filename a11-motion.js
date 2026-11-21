(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('a11-motion-ready');
  const progress = document.createElement('div');
  progress.className = 'a11-reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const value = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, value / 100)) + ')';
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.home-page > section, .surface-main > section, .surface-grid > *, .architecture-grid > *, .builder-grid > *, .home-route-grid > *, .home-bento > *, .doc-list > *, .gate-grid > *');
  targets.forEach((el, index) => {
    el.classList.add('a11-reveal');
    if (el.matches('.home-bento > *, .home-route-grid > *, .surface-grid > *, .architecture-grid > *, .builder-grid > *')) el.style.setProperty('--a11-delay', Math.min(index % 6, 5) * 65 + 'ms');
  });
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
  targets.forEach(el => observer.observe(el));
})();
