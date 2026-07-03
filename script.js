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
  function closeNav() {
    navDrawer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    navDrawer.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    header.classList.remove('header-hidden');
  }
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      if (navDrawer.classList.contains('open')) closeNav();
      else openNav();
    });
    navMenu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    if (navScrim) navScrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
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
