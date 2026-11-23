/**
 * Aaron Francis — Personal Portfolio Script
 * Modern, accessible interactions, theme system, and smooth animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // ===== 1. SINGLE "TIME OF DAY" TOGGLE WITH PERSISTENCE & 16-BIT TRANSITION =====
  const timeHudBtn = $("#time-hud");
  const mobileThemeToggleBtn = $("#mobile-theme-toggle");
  const htmlRoot = document.documentElement;

  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const getActiveTheme = () => {
    return htmlRoot.getAttribute("data-theme") || localStorage.getItem("af_theme") || getSystemTheme();
  };

  const updateHudLabel = (theme) => {
    const isDark = theme === "dark";
    const hudStatus = $("#time-hud-status");
    if (hudStatus) {
      hudStatus.textContent = isDark ? "[ Night ]" : "[ Day ]";
    }
    const mobileStatus = $("#mobile-hud-status");
    if (mobileStatus) {
      mobileStatus.textContent = isDark ? "Night" : "Day";
    }
    if (timeHudBtn) {
      const label = `Time of Day: currently ${isDark ? "Night" : "Day"}. Click to transition.`;
      timeHudBtn.setAttribute("aria-label", label);
      timeHudBtn.setAttribute("title", label);
    }
  };

  const applyTheme = (theme, save = true) => {
    htmlRoot.setAttribute("data-theme", theme);
    if (save) {
      try {
        localStorage.setItem("af_theme", theme);
      } catch (e) {
        console.warn("localStorage not available:", e);
      }
    }
    updateHudLabel(theme);
  };

  // Initialize theme button state without triggering transition on page load
  const currentTheme = getActiveTheme();
  applyTheme(currentTheme, false);

  const toggleTheme = () => {
    let nextTheme;
    if (window.pixelWorld) {
      // Trigger signature 16-bit animated sunset or sunrise transition!
      nextTheme = window.pixelWorld.toggleThemeTransition();
    } else {
      const current = getActiveTheme();
      nextTheme = current === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    }
  };

  if (timeHudBtn) {
    timeHudBtn.addEventListener("click", toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", toggleTheme);
  }

  // Listen to OS theme changes if user hasn't explicitly set a preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("af_theme")) {
      applyTheme(e.matches ? "dark" : "light", false);
    }
  });

  // ===== 2. DYNAMIC FOOTER YEAR =====
  const yrEl = $("#yr-now");
  if (yrEl) {
    yrEl.textContent = new Date().getFullYear();
  }

  // ===== 3. SCROLL-REVEAL OBSERVER =====
  const revealElements = $$(".rv");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(node => revealObserver.observe(node));
  } else {
    revealElements.forEach(node => node.classList.add("in"));
  }

  // ===== 4. ROTATING HERO ROLES =====
  const words = ["Coder.", "Hardware Tinkerer.", "Game Dev Explorer.", "Problem Solver."];
  const rw = $("#rw");
  if (rw) {
    if (prefersReducedMotion) {
      rw.textContent = words[0];
    } else if (words.length > 1) {
      let wordIdx = 0;
      setInterval(() => {
        rw.classList.add("out");
        setTimeout(() => {
          wordIdx = (wordIdx + 1) % words.length;
          rw.textContent = words[wordIdx];
          rw.style.transition = "none";
          rw.classList.remove("out");
          rw.classList.add("pre");
          rw.offsetWidth; // Force DOM reflow
          rw.style.transition = "";
          rw.classList.remove("pre");
        }, 380);
      }, 2300);
    }
  }

  // ===== 5. NAVBAR SCROLL EFFECT & MOBILE DRAWER MENU =====
  const hd = $("#hd");
  const mb = $("#mb");
  const mn = $("#mn");
  const tl = $(".tl");
  const tf = $(".tf");
  let scrollTicking = false;

  const toggleMobileMenu = open => {
    if (!mn || !mb) return;
    mn.hidden = !open;
    mb.setAttribute("aria-expanded", String(open));
    if (open) {
      mn.style.display = "block";
    } else {
      mn.style.display = "none";
    }
  };

  if (mb && mn) {
    mb.addEventListener("click", e => {
      e.stopPropagation();
      toggleMobileMenu(mn.hidden);
    });

    mn.addEventListener("click", e => {
      if (e.target.closest("a")) {
        toggleMobileMenu(false);
      }
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !mn.hidden) {
        toggleMobileMenu(false);
      }
    });

    document.addEventListener("click", e => {
      if (hd && !hd.contains(e.target) && !mn.hidden) {
        toggleMobileMenu(false);
      }
    });
  }

  const onScroll = () => {
    scrollTicking = false;
    const currentY = window.scrollY;

    // Header glass transition
    if (hd) {
      hd.classList.toggle("sc", currentY > 20);
    }

    // Journey Timeline progress
    if (tl && tf && !prefersReducedMotion) {
      const rect = tl.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - rect.top) / rect.height));
      tf.style.transform = `scaleY(${progress})`;
    }
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  // ===== 6. ACTIVE NAVIGATION SCROLL-SPY =====
  const sections = ["home", "journey", "skills", "projects", "beyond", "contact"];
  if ("IntersectionObserver" in window) {
    const navSpy = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const activeId = entry.target.id;
            $$(".dl a").forEach(a => {
              const href = a.getAttribute("href");
              a.classList.toggle("on", href === `#${activeId}`);
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) navSpy.observe(el);
    });
  }

  // ===== 7. STRICTLY NON-CLICKABLE PROJECT CARDS =====
  // User Requirement: Project cards must NOT become clickable links or trigger page navigation
  $$(".pj").forEach(card => {
    card.addEventListener("click", e => {
      // Do not navigate
      e.preventDefault();
    });
    // Ensure keyboard accessibility without activating navigation
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
      }
    });
  });

  // ===== 8. INTERACTIVE 3D MOUSE TILT ON BEYOND-THE-CODE CARDS =====
  if (!prefersReducedMotion && !isTouchDevice) {
    const tiltCards = $$("[data-tilt]");

    tiltCards.forEach(card => {
      const svg = card.querySelector(".beyond-svg");
      if (!svg) return;

      let rafId = null;

      const handleMouseMove = e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          // Subtle, tactile 3D tilt
          const rotX = -deltaY * 10;
          const rotY = deltaX * 12;
          svg.style.transform = `perspective(600px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px) scale(1.05)`;
        });
      };

      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        svg.style.transform = "";
      };

      card.addEventListener("mousemove", handleMouseMove, { passive: true });
      card.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    });
  }
});
