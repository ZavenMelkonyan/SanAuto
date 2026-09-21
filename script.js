/* SanAuto — interactions */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  var fab = document.querySelector(".fab-call");

  /* ---- Header state + floating call button ---- */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("scrolled", y > 10);
    if (fab) fab.classList.toggle("show", y > (hero ? hero.offsetHeight * 0.6 : 400));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("main-nav");
  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  }
  burger.addEventListener("click", function () { setMenu(!header.classList.contains("menu-open")); });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("click", function (e) { if (!header.contains(e.target)) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---- Active menu item while scrolling ---- */
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
  if ("IntersectionObserver" in window) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("active"); });
        var link = byId[en.target.id];
        if (link) link.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(byId).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---- Gentle slide-in for blocks below the fold (content stays visible) ---- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.remove("pre");
          en.target.classList.add("in");
          reveal.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("pre");
        reveal.observe(el);
      }
    });
  }

  /* ---- Count-up numbers ---- */
  function formatNumber(n, decimals) {
    if (decimals) return n.toFixed(decimals);
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var suffixHtml = suffix === "★" ? "<b>★</b>" : suffix;
    var start = null, duration = 1500;
    function frame(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.innerHTML = formatNumber(target * eased, decimals) + suffixHtml;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (!reduceMotion && "IntersectionObserver" in window) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { runCounter(en.target); counterIO.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    document.querySelectorAll("[data-count]").forEach(function (el) { counterIO.observe(el); });
  }

  /* ---- Gallery lightbox ---- */
  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  var lb = document.getElementById("lightbox");
  var lbImg = lb.querySelector("img");
  var lbCaption = lb.querySelector(".lb-caption");
  var lbCount = lb.querySelector(".lb-count");
  var current = 0, lastFocus = null;

  function show(i) {
    current = (i + shots.length) % shots.length;
    var img = shots[current].querySelector("img");
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lbCount.textContent = (current + 1) + " / " + shots.length;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.documentElement.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.documentElement.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  shots.forEach(function (s, i) { s.addEventListener("click", function () { openLb(i); }); });
  document.querySelectorAll("[data-open-gallery]").forEach(function (b) {
    b.addEventListener("click", function () { openLb(parseInt(b.getAttribute("data-open-gallery"), 10) || 0); });
  });
  lb.querySelector(".lb-close").addEventListener("click", closeLb);
  lb.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  lb.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "Tab") { // keep focus inside the dialog
      var f = lb.querySelectorAll("button");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var touchX = null;
  lb.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* ---- Social links: placeholders until real profiles are added ---- */
  document.querySelectorAll("[data-social]").forEach(function (a) {
    if (a.getAttribute("href") === "#") a.addEventListener("click", function (e) { e.preventDefault(); });
  });
})();
