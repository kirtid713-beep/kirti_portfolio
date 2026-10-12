/**
 * Kirti Dave - Biotechnology Student Portfolio
 * Vanilla JavaScript: Theme Toggle, Mobile Nav, ScrollSpy, Animations, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Light / Dark Mode with LocalStorage)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check stored preference or system preference
  const savedTheme = localStorage.getItem('kirti-portfolio-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersDark) {
    htmlElement.setAttribute('data-theme', 'dark');
  } else {
    htmlElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('kirti-portfolio-theme', newTheme);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close when clicking outside of nav
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Header Scroll Effect & Back-to-Top Button
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (header) {
      if (scrollPos > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 350) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 4. ScrollSpy: Highlight Active Navigation Link
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(section => scrollSpyObserver.observe(section));

  // --------------------------------------------------------------------------
  // 5. Scroll Reveal Animations
  // --------------------------------------------------------------------------
  const animatableElements = document.querySelectorAll(
    '.about-bio-card, .info-card, .timeline-item, .skill-card, .project-card, .cert-card, .interest-card, .goal-card, .contact-info-card, .contact-form-card'
  );

  animatableElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatableElements.forEach(el => revealObserver.observe(el));

  // --------------------------------------------------------------------------
  // 6. Interactive Contact Form with Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const successBanner = document.getElementById('form-success-banner');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        nameError.classList.add('visible');
        isValid = false;
      } else {
        nameInput.classList.remove('invalid');
        nameError.classList.remove('visible');
      }

      // Validate Email
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        emailError.classList.add('visible');
        isValid = false;
      } else {
        emailInput.classList.remove('invalid');
        emailError.classList.remove('visible');
      }

      // Validate Subject
      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('invalid');
        subjectError.classList.add('visible');
        isValid = false;
      } else {
        subjectInput.classList.remove('invalid');
        subjectError.classList.remove('visible');
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageInput.classList.add('invalid');
        messageError.classList.add('visible');
        isValid = false;
      } else {
        messageInput.classList.remove('invalid');
        messageError.classList.remove('visible');
      }

      // If valid, simulate submission feedback
      if (isValid) {
        const submitBtn = document.getElementById('submit-btn');
        const originalContent = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span>`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalContent;
          contactForm.reset();

          if (successBanner) {
            successBanner.classList.remove('hidden');
            successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Auto-hide banner after 8 seconds
            setTimeout(() => {
              successBanner.classList.add('hidden');
            }, 8000);
          }
        }, 700);
      }
    });

    // Clear validation error on input
    [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.classList.remove('invalid');
          const errorSpan = document.getElementById(`${input.id}-error`);
          if (errorSpan) {
            errorSpan.classList.remove('visible');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Dynamic Footer Year
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 8. Helpful Placeholder Toast for LinkedIn / GitHub
  // --------------------------------------------------------------------------
  const placeholderLinks = document.querySelectorAll('a[href*="placeholder"]');
  placeholderLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Allow opening placeholder URL if user clicks, but log/notify politely
      console.info(`Kirti, remember to update ${link.getAttribute('href')} with your real profile link in index.html!`);
    });
  });
});
