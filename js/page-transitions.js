// -----------------------------------------
// SITE INIT (Lenis, Nav, Helpers)
// -----------------------------------------

let lenis = null;

const hasLenis = typeof window.Lenis !== "undefined";

// -----------------------------------------
// INIT
// -----------------------------------------

function initSite() {
  initLenis();
  if (document.querySelector('[data-twostep-nav]')) initTwostepScalingNavigation();
  initDynamicCurrentYear();
  initChangePageTitleOnLeave();
}

// -----------------------------------------
// LENIS SMOOTH SCROLL
// -----------------------------------------

function initLenis() {
  if (lenis) return;
  if (!hasLenis) return;

  lenis = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// -----------------------------------------
// CHANGE PAGE TITLE ON LEAVE
// -----------------------------------------

function initChangePageTitleOnLeave() {
  const documentTitleStore = document.title;
  const documentTitleOnBlur = "Kom tillbaka! \u2014 FramerExpert.se";

  window.addEventListener("focus", () => {
    document.title = documentTitleStore;
  });

  window.addEventListener("blur", () => {
    document.title = documentTitleOnBlur;
  });
}

// -----------------------------------------
// DYNAMIC CURRENT YEAR
// -----------------------------------------

function initDynamicCurrentYear() {
  const currentYear = new Date().getFullYear();
  const currentYearElements = document.querySelectorAll('[data-current-year]');
  currentYearElements.forEach(currentYearElement => {
    currentYearElement.textContent = currentYear;
  });
}

// -----------------------------------------
// TWO-STEP SCALING NAVIGATION
// -----------------------------------------

function initTwostepScalingNavigation() {
  const navElement = document.querySelector("[data-twostep-nav]");
  const navStatusEl = document.querySelector("[data-nav-status]");

  if (!navElement || !navStatusEl) return;

  const setNavStatus = (status) => {
    navStatusEl.setAttribute("data-nav-status", status);
  };

  const isActive = () => navStatusEl.getAttribute("data-nav-status") === "active";

  const openNav = () => {
    setNavStatus("active");
    if (lenis && typeof lenis.stop === "function") lenis.stop();
  };

  const closeNav = () => {
    setNavStatus("not-active");
    if (lenis && typeof lenis.start === "function") lenis.start();
  };

  const toggleNav = () => (isActive() ? closeNav() : openNav());

  document.querySelectorAll('[data-nav-toggle="toggle"]').forEach((btn) => {
    btn.addEventListener("click", toggleNav);
  });

  document.querySelectorAll('[data-nav-toggle="close"]').forEach((btn) => {
    btn.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isActive()) closeNav();
  });
}

// -----------------------------------------
// RUN
// -----------------------------------------

initSite();
