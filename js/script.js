const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navMenu.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('nav-open', !isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    });
  });
}
document.documentElement.classList.add('has-js');

const experienceItems = document.querySelectorAll('.experience .timeline-item');

if (experienceItems.length > 0) {
  if ('IntersectionObserver' in window) {
    const experienceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.22,
    });

    experienceItems.forEach((item) => experienceObserver.observe(item));
  } else {
    experienceItems.forEach((item) => item.classList.add('is-visible'));
  }
}
