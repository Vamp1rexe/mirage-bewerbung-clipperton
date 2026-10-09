(function () {
  /* Einblenden beim Scrollen */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* Lesefortschritt */
  var bar = document.querySelector('.progress i');
  function progress() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? h.scrollTop / max : 0;
    if (bar) bar.style.transform = 'scaleX(' + p + ')';
  }
  window.addEventListener('scroll', progress, { passive: true });
  progress();

  /* Menü (Handy) */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('menu');
  function closeMenu() {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Menü öffnen');
  }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 760) closeMenu(); });

  /* Aktiver Menüpunkt */
  var links = Array.prototype.slice.call(document.querySelectorAll('.top nav a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var secs = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  function spy() {
    var y = window.scrollY + window.innerHeight * 0.35;
    var cur = null;
    secs.forEach(function (s) { if (s.offsetTop <= y) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle('on', cur && map[cur] === a); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();
})();
