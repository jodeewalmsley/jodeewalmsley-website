/* ==========================================================================
   Jo-Dee Walmsley — Website Framework
   Shared behaviour: mobile nav, search overlay, scroll reveal, dynamic year,
   placeholder form handling. Progressive enhancement — site is usable
   without JS; this file only adds convenience and polish.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });
    // Close menu when a nav link is chosen (mobile)
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Dynamic footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Search overlay ---------- */
  var searchToggle = document.querySelector(".search-toggle");
  var searchOverlay = document.getElementById("search-overlay");
  var searchInput = document.getElementById("search-input");
  var searchResults = document.getElementById("search-results");
  var searchClose = document.querySelector(".search-close");

  function openSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = false;
    searchToggle.setAttribute("aria-expanded", "true");
    if (searchInput) { searchInput.value = ""; searchInput.focus(); }
    renderResults("");
  }
  function closeSearch() {
    if (!searchOverlay) return;
    searchOverlay.hidden = true;
    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.focus();
  }
  function renderResults(query) {
    if (!searchResults || typeof SITE_SEARCH_INDEX === "undefined") return;
    var q = query.trim().toLowerCase();
    var matches = SITE_SEARCH_INDEX.filter(function (item) {
      return !q ||
        item.title.toLowerCase().indexOf(q) !== -1 ||
        item.excerpt.toLowerCase().indexOf(q) !== -1 ||
        item.category.toLowerCase().indexOf(q) !== -1;
    });
    searchResults.innerHTML = "";
    if (matches.length === 0) {
      var empty = document.createElement("li");
      empty.className = "search-empty";
      empty.textContent = "No results. Try a different term.";
      searchResults.appendChild(empty);
      return;
    }
    matches.slice(0, 8).forEach(function (item) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = item.url;
      a.innerHTML = '<span class="search-result-title">' + item.title +
        '</span><span class="search-result-meta">' + item.category + ' — ' + item.excerpt + '</span>';
      li.appendChild(a);
      searchResults.appendChild(li);
    });
  }

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", openSearch);
    if (searchClose) searchClose.addEventListener("click", closeSearch);
    searchOverlay.addEventListener("click", function (e) {
      if (e.target === searchOverlay) closeSearch();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !searchOverlay.hidden) closeSearch();
    });
    if (searchInput) {
      searchInput.addEventListener("input", function () { renderResults(searchInput.value); });
    }
  }

  /* ---------- Highlight photo lightbox (if present) ----------
     Speaking Highlights grid: clicking a photo opens it larger with its title/caption.
     Mirrors the search-overlay pattern above (open/close, backdrop click, Escape, focus
     management) so the interaction feels consistent with the rest of the site. */
  var lightbox = document.getElementById("highlight-lightbox");
  var lightboxImage = document.getElementById("lightbox-image");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxCaptionText = document.getElementById("lightbox-caption-text");
  var lightboxClose = document.querySelector(".lightbox-close");
  var lightboxTriggers = document.querySelectorAll(".highlight-photo-btn");
  var lightboxLastFocused = null;

  function openLightbox(btn) {
    if (!lightbox || !lightboxImage) return;
    var img = btn.querySelector("img");
    if (!img) return;
    lightboxLastFocused = btn;
    lightboxImage.src = img.currentSrc || img.src;
    lightboxImage.alt = img.alt;
    if (lightboxTitle) lightboxTitle.textContent = btn.getAttribute("data-lightbox-title") || "";
    if (lightboxCaptionText) lightboxCaptionText.textContent = btn.getAttribute("data-lightbox-caption") || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    if (lightboxClose) lightboxClose.focus();
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lightboxLastFocused) lightboxLastFocused.focus();
  }
  if (lightbox && lightboxTriggers.length) {
    lightboxTriggers.forEach(function (btn) {
      btn.addEventListener("click", function () { openLightbox(btn); });
    });
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------- Blog category filter (if present) ---------- */
  var filterPills = document.querySelectorAll(".filter-pill");
  if (filterPills.length) {
    filterPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        filterPills.forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
        pill.setAttribute("aria-pressed", "true");
        var category = pill.getAttribute("data-category");
        document.querySelectorAll("[data-post-category]").forEach(function (card) {
          var show = category === "all" || card.getAttribute("data-post-category") === category;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (el) { observer.observe(el); });
    }
  }

  /* ---------- Placeholder form handling ----------
     No backend is wired up yet. On submit we prevent the default action,
     show an inline confirmation, and log intent to the console so a
     developer can see the form is functioning correctly end-to-end.
     Replace with a real handler (e.g. Netlify Forms, Formspree, custom
     endpoint) before launch. */
  document.querySelectorAll("form[data-placeholder-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var successEl = form.querySelector(".form-success");
      console.info("[Placeholder form submitted]", form.getAttribute("data-form-name"), Object.fromEntries(new FormData(form)));
      if (successEl) {
        successEl.classList.add("is-visible");
        successEl.setAttribute("role", "status");
        form.reset();
      }
    });
  });
})();
