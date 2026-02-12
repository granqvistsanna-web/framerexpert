// -----------------------------------------
// PAGE TRANSITION BOILERPLATE (based on Osmo)
// -----------------------------------------

gsap.registerPlugin(CustomEase);

history.scrollRestoration = "manual";

let lenis = null;
let nextPage = document;
let onceFunctionsInitialized = false;

const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

const rmMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
let reducedMotion = rmMQ.matches;
rmMQ.addEventListener?.("change", e => (reducedMotion = e.matches));
rmMQ.addListener?.(e => (reducedMotion = e.matches));

const has = (s) => !!nextPage.querySelector(s);

let staggerDefault = 0.05;
let durationDefault = 0.6;

CustomEase.create("osmo", "0.625, 0.05, 0, 1");
gsap.defaults({ ease: "osmo", duration: durationDefault });

// -----------------------------------------
// FUNCTION REGISTRY
// -----------------------------------------

function initOnceFunctions() {
  initLenis();
  if (onceFunctionsInitialized) return;
  onceFunctionsInitialized = true;

  // Runs once on first load (nav is outside barba container, use document)
  if (document.querySelector('[data-twostep-nav]')) initTwostepScalingNavigation();
  initDynamicCurrentYear();
  initChangePageTitleOnLeave();
}

function initBeforeEnterFunctions(next) {
  nextPage = next || document;

  // Runs before the enter animation
}

function initAfterEnterFunctions(next) {
  nextPage = next || document;

  // Runs after enter animation completes
  initDynamicCurrentYear();

  if (hasLenis) {
    lenis.resize();
  }

  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

// -----------------------------------------
// PAGE TRANSITIONS
// -----------------------------------------

function runPageOnceAnimation(next) {
  const tl = gsap.timeline();

  tl.call(() => {
    resetPage(next);
  }, null, 0);

  return tl;
}

function runPageLeaveAnimation(current, next) {
  const parent = current.parentElement || document.body;

  const { wrapper } = prepareForTransition(parent, current, next);

  const tl = gsap.timeline({
    onComplete: () => {
      wrapper.remove();
      gsap.set(parent, { clearProps: "perspective,transformStyle,overflow" });
      gsap.set(next, { clearProps: "position,inset,width,height,zIndex,transformStyle,willChange,backfaceVisibility,transform" });
    },
  });

  if (reducedMotion) {
    return tl.set(current, { autoAlpha: 0 });
  }

  tl.to(wrapper, {
    z: "-100vw",
    duration: 0.9,
    clipPath: "rect(0% 100% 100% 0% round 1.5em)"
  }, 0);

  tl.to(wrapper, {
    xPercent: -175,
    duration: 1,
    overwrite: "auto"
  }, 0.25);

  tl.to(next, {
    xPercent: 0,
    duration: 1,
    overwrite: "auto"
  }, "<");

  tl.to(next, {
    z: 0,
    duration: 0.9,
    overwrite: "auto",
    clipPath: "rect(0% 100% 100% 0% round 0em)"
  }, ">-=0.4");

  return tl;
}

function runPageEnterAnimation(next) {
  const tl = gsap.timeline();

  if (reducedMotion) {
    tl.set(next, { autoAlpha: 1 });
    tl.add("pageReady");
    tl.call(resetPage, [next], "pageReady");
    return new Promise(resolve => tl.call(resolve, null, "pageReady"));
  }

  tl.add("pageReady");
  tl.call(resetPage, [next], "pageReady");

  return new Promise(resolve => {
    tl.call(resolve, null, "pageReady");
  });
}

function prepareForTransition(parent, current, next) {
  const wrapper = document.createElement("div");
  wrapper.className = "page-transition__wrapper";

  parent.insertBefore(wrapper, current);
  wrapper.appendChild(current);

  const scrollY = window.scrollY || 0;
  window.scrollTo(0, 0);

  gsap.set(parent, {
    perspective: "100vw",
    transformStyle: "preserve-3d",
    overflow: "clip",
  });

  gsap.set(wrapper, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100vh",
    overflow: "clip",
    zIndex: 2,
    transformStyle: "preserve-3d",
    willChange: "transform",
    clipPath: "rect(0% 100% 100% 0% round 0em)"
  });

  gsap.set(current, {
    position: "absolute",
    top: -scrollY,
    left: 0,
    width: "100%",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
  });

  gsap.set(next, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100vh",
    overflow: "clip",
    zIndex: 1,
    transformStyle: "preserve-3d",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
    xPercent: 175,
    z: "-100vw",
    autoAlpha: 1,
    clipPath: "rect(0% 100% 100% 0% round 1.5em)"
  });

  return { wrapper, scrollY };
}

// -----------------------------------------
// BARBA HOOKS + INIT
// -----------------------------------------

barba.hooks.beforeEnter(data => {
  gsap.set(data.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  });

  if (lenis && typeof lenis.stop === "function") {
    lenis.stop();
  }

  initBeforeEnterFunctions(data.next.container);
  applyThemeFrom(data.next.container);
});

barba.hooks.afterLeave(() => {
  if (hasScrollTrigger) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
});

barba.hooks.enter(data => {
  initBarbaNavUpdate(data);
});

barba.hooks.afterEnter(data => {
  initAfterEnterFunctions(data.next.container);

  if (hasLenis) {
    lenis.resize();
    lenis.start();
  }

  if (hasScrollTrigger) {
    ScrollTrigger.refresh();
  }
});

barba.init({
  debug: false,
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "default",
      sync: true,

      async once(data) {
        initOnceFunctions();
        return runPageOnceAnimation(data.next.container);
      },

      async leave(data) {
        return runPageLeaveAnimation(data.current.container, data.next.container);
      },

      async enter(data) {
        return runPageEnterAnimation(data.next.container);
      }
    }
  ],
});

// -----------------------------------------
// GENERIC + HELPERS
// -----------------------------------------

const themeConfig = {
  light: { nav: "dark", transition: "light" },
  dark: { nav: "light", transition: "dark" }
};

function applyThemeFrom(container) {
  const pageTheme = container?.dataset?.pageTheme || "light";
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

function resetPage(container) {
  window.scrollTo(0, 0);
  gsap.set(container, { clearProps: "position,top,left,right" });

  if (hasLenis) {
    lenis.resize();
    lenis.start();
  }
}

function debounceOnWidthChange(fn, ms) {
  let last = innerWidth, timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (innerWidth !== last) {
        last = innerWidth;
        fn.apply(this, args);
      }
    }, ms);
  };
}

function initBarbaNavUpdate(data) {
  var tpl = document.createElement('template');
  tpl.innerHTML = data.next.html.trim();
  var nextNodes = tpl.content.querySelectorAll('[data-barba-update]');
  var currentNodes = document.querySelectorAll('nav [data-barba-update]');

  currentNodes.forEach(function (curr, index) {
    var next = nextNodes[index];
    if (!next) return;

    var newStatus = next.getAttribute('aria-current');
    if (newStatus !== null) {
      curr.setAttribute('aria-current', newStatus);
    } else {
      curr.removeAttribute('aria-current');
    }

    var newClassList = next.getAttribute('class') || '';
    curr.setAttribute('class', newClassList);
  });
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
