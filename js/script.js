if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const resetScrollPosition = () => {
  window.scrollTo(0, 0);
};

window.addEventListener('pageshow', resetScrollPosition);
window.addEventListener('beforeunload', resetScrollPosition);

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
const shareButtons = document.querySelectorAll('[data-share-button]');

if (shareButtons.length > 0) {
  const shareFeedbackDelay = 2000;

  const copyCurrentUrl = () => {
    const currentUrl = window.location.href;

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(currentUrl);
    }

    const textArea = document.createElement('textarea');
    textArea.value = currentUrl;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    return Promise.resolve();
  };

  shareButtons.forEach((shareButton) => {
    const shareStatus = shareButton.querySelector('[data-share-status]');
    const shareLabel = shareButton.querySelector('[data-share-label]');

    const updateShareFeedback = (message) => {
      if (shareStatus) {
        shareStatus.textContent = message;
      }

      if (shareLabel) {
        shareLabel.textContent = message;
      }
    };

    shareButton.addEventListener('click', () => {
      copyCurrentUrl().then(() => {
        updateShareFeedback('Copied to clipboard');

        window.setTimeout(() => {
          updateShareFeedback('Share');
        }, shareFeedbackDelay);
      });
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
