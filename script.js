document.addEventListener("DOMContentLoaded", () => {
  const $ = s => document.querySelector(s);
  const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Dynamic footer year
  const yrEl = $("#yr-now");
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".rv").forEach(node => io.observe(node));

  // Rotating hero words
  const words = ["Coder.", "Maker.", "Builder."];
  const rw = $("#rw");
  if (rw) {
    if (prefersReducedMotion) {
      rw.textContent = words.join(" ");
    } else if (words.length > 1) {
      let i = 0;
      setInterval(() => {
        rw.classList.add("out");
        setTimeout(() => {
          i = (i + 1) % words.length;
          rw.textContent = words[i];
          rw.style.transition = "none";
          rw.classList.remove("out");
          rw.classList.add("pre");
          rw.offsetWidth; // Force reflow
          rw.style.transition = "";
          rw.classList.remove("pre");
        }, 380);
      }, 1900);
    }
  }

  // Navbar scroll effect, mobile menu toggle, and timeline progress
  const hd = $("#hd");
  const mb = $("#mb");
  const mn = $("#mn");
  const tl = $(".tl");
  const tf = $(".tf");
  let ticking = false;

  const toggleMenu = open => {
    if (!mn || !mb) return;
    mn.hidden = !open;
    mb.setAttribute("aria-expanded", String(open));
  };

  if (mb && mn) {
    mb.onclick = () => toggleMenu(mn.hidden);
    mn.onclick = e => {
      if (e.target.closest("a")) toggleMenu(false);
    };
  }

  addEventListener("keydown", e => {
    if (e.key === "Escape") toggleMenu(false);
  });

  document.addEventListener("click", e => {
    if (hd && !hd.contains(e.target)) toggleMenu(false);
  });

  const updateScroll = () => {
    ticking = false;
    if (hd) {
      hd.classList.toggle("sc", scrollY > 16);
    }
    if (tl && tf) {
      const r = tl.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      tf.style.transform = `scaleY(${progress})`;
    }
  };

  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = requestAnimationFrame(updateScroll);
    }
  }, { passive: true });
  updateScroll();

  // Scroll-spy for active navigation highlighting
  const sections = ["home", "journey", "skills", "projects", "beyond", "contact"];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".dl a").forEach(a => {
          a.classList.toggle("on", a.hash === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(id => {
    const el = $("#" + id);
    if (el) spy.observe(el);
  });

  // Explicitly ensure project cards do not trigger navigation
  document.querySelectorAll(".pj").forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
    });
  });
});
