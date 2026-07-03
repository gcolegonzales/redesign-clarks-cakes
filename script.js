/* Clark's Cakes & Confections — interactions */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');
  var navDrawer = document.getElementById('navDrawer');
  var navScrim = document.getElementById('navScrim');

  /* ---- Sticky/shrinking header + reveal-on-scroll-up ---- */
  var lastScrolled = false;
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    var s = y > 24;
    if (s !== lastScrolled) {
      header.classList.toggle('scrolled', s);
      lastScrolled = s;
    }
    // Hide on scroll down (past the header), reveal instantly on ANY upward scroll.
    if (y > lastY && y > 120) {
      header.classList.add('header-hidden');
    } else if (y < lastY) {
      header.classList.remove('header-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav ---- */
  var DESKTOP = 941; // >940px is the desktop nav (drawer lives in max-width:940px)
  var navOpen = false;

  function drawerLinks() {
    return Array.prototype.slice.call(navMenu.querySelectorAll('a'));
  }
  // Keep off-canvas links out of the tab order whenever the drawer is closed
  // or we're at desktop widths (where the menu is the inline desktop nav).
  function syncDrawerTabbability() {
    var mobile = window.innerWidth < DESKTOP;
    // Only hide links from the tab order when the drawer is the off-canvas
    // panel (mobile) AND it is closed. At desktop widths the same <ul> is the
    // inline nav and must stay tabbable.
    var hide = mobile && !navOpen;
    drawerLinks().forEach(function (a) {
      if (hide) a.setAttribute('tabindex', '-1');
      else a.removeAttribute('tabindex');
    });
  }

  function setInert(on) {
    // Mark everything except the header inert while the drawer is open.
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === header) return;
      if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
      else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
    });
  }

  function closeNav(restoreFocus) {
    if (!navOpen) return;
    navOpen = false;
    navDrawer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    setInert(false);
    syncDrawerTabbability();
    if (restoreFocus !== false) navToggle.focus();
  }
  function openNav() {
    if (navOpen) return;
    navOpen = true;
    navDrawer.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    header.classList.remove('header-hidden');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    setInert(true);
    syncDrawerTabbability();
    var links = drawerLinks();
    if (links.length) links[0].focus();
  }
  if (navToggle) {
    navToggle.setAttribute('aria-label', 'Open menu');
    syncDrawerTabbability();

    navToggle.addEventListener('click', function () {
      if (navOpen) closeNav();
      else openNav();
    });
    navMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    if (navScrim) navScrim.addEventListener('click', function () { closeNav(); });
    document.addEventListener('keydown', function (e) {
      if (!navOpen) return;
      if (e.key === 'Escape') { closeNav(); return; }
      if (e.key === 'Tab') {
        // Trap Tab within the toggle + drawer links.
        var focusables = [navToggle].concat(drawerLinks());
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        } else if (focusables.indexOf(document.activeElement) === -1) {
          e.preventDefault(); first.focus();
        }
      }
    });

    // Reset drawer + toggle state when crossing the desktop breakpoint.
    var wasDesktop = window.innerWidth >= DESKTOP;
    window.addEventListener('resize', function () {
      var isDesktop = window.innerWidth >= DESKTOP;
      if (isDesktop && navOpen) closeNav(false);
      if (isDesktop !== wasDesktop) { wasDesktop = isDesktop; syncDrawerTabbability(); }
    });
  }

  /* ---- Brand / logo scroll-to-top (the #top anchor was a no-op) ---- */
  var brand = document.querySelector('.brand');
  if (brand) {
    brand.addEventListener('click', function (e) {
      e.preventDefault();
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      header.classList.remove('header-hidden');
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el, i) {
      // gentle stagger within a group by delaying transition slightly
      el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
      io.observe(el);
    });
  }

  /* ---- Footer year ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Consultation form (demo, no backend) ---- */
  var form = document.getElementById('consultForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#cf-name');
      var email = form.querySelector('#cf-email');
      if (!name.value.trim() || !email.checkValidity()) {
        status.style.color = '';
        status.textContent = 'Please add your name and a valid email so Clark can reach you.';
        (!name.value.trim() ? name : email).focus();
        return;
      }
      var first = name.value.trim().split(' ')[0];
      status.textContent = 'Thank you, ' + first + '! Your request is ready — once live, this goes straight to Clark.';
      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        if (el.type !== 'submit') el.value = '';
      });
    });
  }
})();
