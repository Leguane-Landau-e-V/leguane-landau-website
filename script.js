/**
 * Leguane Landau e.V. – Website JavaScript
 * Pure Vanilla JavaScript – No Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Current Year in Footer
  // --------------------------------------------------------------------------
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 2. Sticky Header Shadow on Scroll
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Toggle
  // --------------------------------------------------------------------------
  const navToggle = document.getElementById('navToggle');
  const primaryNav = document.getElementById('primaryNav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu(forceClose = false) {
    const isCurrentlyOpen = primaryNav.classList.contains('is-open');
    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    if (shouldOpen) {
      primaryNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Menü schließen');
    } else {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Menü öffnen');
    }
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      toggleMenu();
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (primaryNav.classList.contains('is-open')) {
          toggleMenu(true);
        }
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (event) => {
      if (
        primaryNav.classList.contains('is-open') &&
        !primaryNav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        toggleMenu(true);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNav.classList.contains('is-open')) {
        toggleMenu(true);
        navToggle.focus();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Accessible Accordion FAQ
  // --------------------------------------------------------------------------
  const accordionButtons = document.querySelectorAll('.accordion-header');

  accordionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      const targetId = button.getAttribute('aria-controls');
      const targetCollapse = document.getElementById(targetId);

      if (!targetCollapse) return;

      if (isExpanded) {
        button.setAttribute('aria-expanded', 'false');
        targetCollapse.hidden = true;
      } else {
        // Optional: Close other open accordion items
        accordionButtons.forEach(otherBtn => {
          if (otherBtn !== button) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherTarget = document.getElementById(otherBtn.getAttribute('aria-controls'));
            if (otherTarget) otherTarget.hidden = true;
          }
        });

        button.setAttribute('aria-expanded', 'true');
        targetCollapse.hidden = false;
      }
    });
  });

  // --------------------------------------------------------------------------
  // 5. Accessible Contact & Membership Form Validation
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const successAlert = document.getElementById('formSuccessMessage');
  const errorAlert = document.getElementById('formErrorMessage');

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const interestInput = document.getElementById('interest');
    const privacyCheckbox = document.getElementById('privacyConsent');

    // Helper functions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(input, errorElementId, errorMessage) {
      input.classList.add('input-invalid');
      const errorElem = document.getElementById(errorElementId);
      if (errorElem) {
        errorElem.textContent = errorMessage;
      }
    }

    function clearFieldError(input, errorElementId) {
      input.classList.remove('input-invalid');
      const errorElem = document.getElementById(errorElementId);
      if (errorElem) {
        errorElem.textContent = '';
      }
    }

    // Live validation event listeners
    nameInput?.addEventListener('input', () => {
      if (nameInput.value.trim().length >= 2) {
        clearFieldError(nameInput, 'nameError');
      }
    });

    emailInput?.addEventListener('input', () => {
      if (emailRegex.test(emailInput.value.trim())) {
        clearFieldError(emailInput, 'emailError');
      }
    });

    interestInput?.addEventListener('change', () => {
      if (interestInput.value !== '') {
        clearFieldError(interestInput, 'interestError');
      }
    });

    privacyCheckbox?.addEventListener('change', () => {
      if (privacyCheckbox.checked) {
        clearFieldError(privacyCheckbox, 'privacyError');
      }
    });

    // Submit handler
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let isValid = true;
      let firstInvalidElement = null;

      // Validate Name
      if (!nameInput || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'nameError', 'Bitte gib deinen Namen ein (mindestens 2 Zeichen).');
        isValid = false;
        firstInvalidElement = firstInvalidElement || nameInput;
      } else {
        clearFieldError(nameInput, 'nameError');
      }

      // Validate Email
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'emailError', 'Bitte gib eine gültige E-Mail-Adresse ein.');
        isValid = false;
        firstInvalidElement = firstInvalidElement || emailInput;
      } else {
        clearFieldError(emailInput, 'emailError');
      }

      // Validate Interest
      if (!interestInput || interestInput.value === '') {
        setFieldError(interestInput, 'interestError', 'Bitte wähle aus, wofür du dich interessierst.');
        isValid = false;
        firstInvalidElement = firstInvalidElement || interestInput;
      } else {
        clearFieldError(interestInput, 'interestError');
      }

      // Validate Privacy Checkbox
      if (!privacyCheckbox || !privacyCheckbox.checked) {
        setFieldError(privacyCheckbox, 'privacyError', 'Bitte bestätige die Datenschutzerklärung.');
        isValid = false;
        firstInvalidElement = firstInvalidElement || privacyCheckbox;
      } else {
        clearFieldError(privacyCheckbox, 'privacyError');
      }

      if (!isValid) {
        if (errorAlert) errorAlert.hidden = false;
        if (successAlert) successAlert.hidden = true;
        if (firstInvalidElement) {
          firstInvalidElement.focus();
        }
        return;
      }

      // If valid: Hide error, show success message
      if (errorAlert) errorAlert.hidden = true;
      if (successAlert) {
        successAlert.hidden = false;
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset the form fields cleanly
      contactForm.reset();

      // OPTIONAL CLIENT-SIDE NOTIFICATION / SUBMISSION NOTE:
      // Since this is a 100% static site without backend, you can either:
      // 1. Connect a free service like Formspree (action="https://formspree.io/f/YOUR_ID")
      // 2. Or replace this form with an embedded Tally / Google Forms iframe.
    });
  }

  // --------------------------------------------------------------------------
  // 6. Modals (Impressum & Datenschutz Dialogs)
  // --------------------------------------------------------------------------
  const modalOpenButtons = document.querySelectorAll('[data-open-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

  modalOpenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
      }
    });
  });

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.close === 'function') {
        modal.close();
      }
    });
  });

  // Close modal when clicking on backdrop
  document.querySelectorAll('.modal-dialog').forEach(modal => {
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        modal.close();
      }
    });
  });
});
