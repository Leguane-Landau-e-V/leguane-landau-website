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
  // 2. Scroll-Scrubbed Background Video
  // --------------------------------------------------------------------------
  const backgroundVideo = document.getElementById('scrollBackgroundVideo');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (backgroundVideo && !prefersReducedMotion.matches) {
    let scrollProgress = 0;
    let syncRequest = 0;

    function syncVideoFrame() {
      syncRequest = 0;

      if (
        backgroundVideo.readyState < HTMLMediaElement.HAVE_METADATA ||
        !Number.isFinite(backgroundVideo.duration)
      ) {
        return;
      }

      const targetTime = scrollProgress * backgroundVideo.duration;
      if (Math.abs(backgroundVideo.currentTime - targetTime) > 1 / 30) {
        backgroundVideo.currentTime = targetTime;
      }
    }

    function scheduleVideoSync() {
      if (!syncRequest) {
        syncRequest = window.requestAnimationFrame(syncVideoFrame);
      }
    }

    function updateScrollProgress() {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = scrollableHeight > 0
        ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
        : 0;
      scheduleVideoSync();
    }
    backgroundVideo.addEventListener('loadedmetadata', () => {
      backgroundVideo.preload = 'auto';
      backgroundVideo.load();
      backgroundVideo.play()
        .then(() => {
          backgroundVideo.pause();
          scheduleVideoSync();
        })
        .catch(() => {
          scheduleVideoSync();
        });
    }, { once: true });
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();
  }

  // --------------------------------------------------------------------------
  // 3. Protected WhatsApp Group Access
  // --------------------------------------------------------------------------
  const whatsappJoinButton = document.getElementById('whatsappJoinButton');
  const whatsappProbetrainingButton = document.getElementById('whatsappProbetrainingButton');
  const whatsappJoinStatus = document.getElementById('whatsappJoinStatus');
  const whatsappGroupStatus = document.getElementById('whatsappGroupStatus');
  const probetrainingToken = { value: '' };
  const groupToken = { value: '' };

  function setWhatsAppButtonDisabled(button, disabled) {
    if (button) {
      button.disabled = disabled;
    }
  }

  function setWhatsAppStatus(message) {
    if (whatsappJoinStatus) {
      whatsappJoinStatus.textContent = message;
    }
  }

  function setWhatsAppGroupStatus(message) {
    if (whatsappGroupStatus) {
      whatsappGroupStatus.textContent = message;
    }
  }

  function resetTurnstile(widgetId) {
    const widget = document.getElementById(widgetId);
    if (window.turnstile && widget) {
      window.turnstile.reset(widget);
    }
  }

  window.onWhatsAppTurnstileSuccess = (token) => {
    probetrainingToken.value = token;
    setWhatsAppButtonDisabled(whatsappProbetrainingButton, false);
    setWhatsAppStatus('');
  };

  window.onWhatsAppTurnstileExpired = () => {
    probetrainingToken.value = '';
    setWhatsAppButtonDisabled(whatsappProbetrainingButton, true);
    setWhatsAppStatus('Die Bestätigung ist abgelaufen. Bitte erneut bestätigen.');
  };

  window.onWhatsAppTurnstileError = () => {
    probetrainingToken.value = '';
    setWhatsAppButtonDisabled(whatsappProbetrainingButton, true);
    setWhatsAppStatus('Die CAPTCHA-Prüfung ist momentan nicht verfügbar.');
  };

  window.onWhatsAppGroupTurnstileSuccess = (token) => {
    groupToken.value = token;
    setWhatsAppButtonDisabled(whatsappJoinButton, false);
    setWhatsAppGroupStatus('');
  };

  window.onWhatsAppGroupTurnstileExpired = () => {
    groupToken.value = '';
    setWhatsAppButtonDisabled(whatsappJoinButton, true);
    setWhatsAppGroupStatus('Die Bestätigung ist abgelaufen. Bitte erneut bestätigen.');
  };

  window.onWhatsAppGroupTurnstileError = () => {
    groupToken.value = '';
    setWhatsAppButtonDisabled(whatsappJoinButton, true);
    setWhatsAppGroupStatus('Die CAPTCHA-Prüfung ist momentan nicht verfügbar.');
  };

  async function openWhatsAppContact(endpoint, loadingMessage, statusSetter, tokenState, button, widgetId) {
    if (!tokenState.value) {
      statusSetter('Bitte bestätige zuerst die CAPTCHA-Prüfung.');
      return;
    }

    setWhatsAppButtonDisabled(button, true);
    statusSetter(loadingMessage);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenState.value })
      });

      const result = await response.json();
      if (!response.ok || typeof result.redirectUrl !== 'string') {
        throw new Error(result.error || 'Einladung konnte nicht geladen werden.');
      }

      window.location.assign(result.redirectUrl);
    } catch (error) {
      tokenState.value = '';
      statusSetter(error.message || 'WhatsApp-Kontakt konnte nicht geladen werden.');
      setWhatsAppButtonDisabled(button, true);
      resetTurnstile(widgetId);
    }
  }

  whatsappJoinButton?.addEventListener('click', () => {
    openWhatsAppContact(
      '/api/whatsapp-invite',
      'Einladung wird vorbereitet …',
      setWhatsAppGroupStatus,
      groupToken,
      whatsappJoinButton,
      'whatsappGroupTurnstile'
    );
  });

  whatsappProbetrainingButton?.addEventListener('click', () => {
    openWhatsAppContact(
      '/api/whatsapp-probetraining',
      'WhatsApp-Kontakt wird vorbereitet …',
      setWhatsAppStatus,
      probetrainingToken,
      whatsappProbetrainingButton,
      'whatsappTurnstile'
    );
  });

  // --------------------------------------------------------------------------
  // 4. Seasonal Events and Calendar Filters
  // --------------------------------------------------------------------------
  const eventFilters = document.querySelectorAll('.event-filter');
  const seasonalEvents = document.querySelectorAll('.seasonal-event');
  const allEvents = document.querySelectorAll('.event-card');
  const seasonStatus = document.getElementById('seasonStatus');
  let activeEventFilter = 'all';

  function getEasterDate(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month, day);
  }

  function getCurrentSeason() {
    const today = new Date();
    const easter = getEasterDate(today.getFullYear());
    const isSummer = today >= easter && today.getMonth() <= 9;
    return isSummer ? 'summer' : 'winter';
  }

  function updateEvents() {
    const season = getCurrentSeason();
    if (seasonStatus) {
      seasonStatus.textContent = season === 'summer'
        ? 'Sommerplan aktiv: April bis Oktober'
        : 'Winterplan aktiv: November bis Ostern';
    }

    allEvents.forEach(event => {
      const matchesSeason = event.dataset.season === 'all' || event.dataset.season === season;
      const matchesFilter = activeEventFilter === 'all' || event.dataset.eventType === activeEventFilter;
      event.hidden = !matchesSeason || !matchesFilter;
    });
  }

  eventFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      activeEventFilter = filter.dataset.eventFilter || 'all';
      eventFilters.forEach(otherFilter => {
        otherFilter.classList.toggle('is-active', otherFilter === filter);
      });
      updateEvents();
    });
  });

  if (seasonalEvents.length || allEvents.length) {
    updateEvents();
  }

  // --------------------------------------------------------------------------
  // 5. Sticky Header Shadow on Scroll
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
  // 6. Mobile Navigation Toggle
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
  // 7. Accessible Accordion FAQ
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
  // 7. Modals (Impressum & Datenschutz Dialogs)
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
