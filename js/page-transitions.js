// -----------------------------------------
// SITE INIT (Lenis, Nav, Helpers)
// -----------------------------------------

gsap.registerPlugin(CustomEase);

let lenis = null;

const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

CustomEase.create("osmo", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "osmo", duration: 0.6 });

// -----------------------------------------
// INIT
// -----------------------------------------

function initSite() {
  initLenis();
  if (document.querySelector('[data-twostep-nav]')) initTwostepScalingNavigation();
  initDynamicCurrentYear();
  initChangePageTitleOnLeave();
  applyThemeFrom(document);
}

// -----------------------------------------
// GENERIC + HELPERS
// -----------------------------------------

const themeConfig = {
  light: { nav: "dark", transition: "light" },
  dark: { nav: "light", transition: "dark" }
};

function applyThemeFrom(container) {
  const el = container === document ? document.body : container;
  const pageTheme = el?.dataset?.pageTheme || "light";
  const config = themeConfig[pageTheme] || themeConfig.light;

  document.body.dataset.pageTheme = pageTheme;
  const transitionEl = document.querySelector('[data-theme-transition]');
  if (transitionEl) {
    transitionEl.dataset.themeTransition = config.transition;
  }

  const nav = document.querySelector('[data-theme-nav]');
  if (nav) {
    nav.dataset.themeNav = config.nav;
  }
}

function initLenis() {
  if (lenis) return;
  if (!hasLenis) return;

  lenis = new Lenis({
    lerp: 0.165,
    wheelMultiplier: 1.25,
  });

  if (hasScrollTrigger) {
    lenis.on("scroll", ScrollTrigger.update);
  }

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
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
