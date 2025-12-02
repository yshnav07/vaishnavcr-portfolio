/* ================================
   MAIN JS — CLEAN + OPTIMIZED
================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================
      CURSOR GLOW
  ========================== */
  const cursor = document.getElementById("cursor-glow");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(0.85)";
    });
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
    });
  }

  /* ==========================
      NEON RING CURSOR
  ========================== */
  document.addEventListener("mousemove", (e) => {
    const c = document.getElementById("neonCursor");
    if (!c) return;
    c.style.left = `${e.clientX}px`;
    c.style.top = `${e.clientY}px`;
  });

  /* ==========================
      BACKGROUND PARTICLES
  ========================== */
  const canvas = document.getElementById("bg-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = innerWidth);
    let h = (canvas.height = innerHeight);

    const particles = [];
    const count = Math.max(28, Math.floor((w * h) / 220000));

    function rand(a, b) {
      return Math.random() * (b - a) + a;
    }

    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.6, 2.6),
        vx: rand(-0.12, 0.12),
        vy: rand(-0.03, 0.03),
        hue: rand(190, 270),
      });
    }

    window.addEventListener("resize", () => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
    });

    (function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},80%,60%,0.05)`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  /* ==========================
      SCROLL REVEAL
  ========================== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(
    ".animate-on-scroll, .glass, .skill-card, .timeline-item, .edu-card"
  ).forEach((el) => observer.observe(el));

  /* ==========================
      SKILL BARS
  ========================== */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.querySelectorAll(".bar-fill").forEach((fill) => {
            fill.style.width = fill.dataset.fill || "80%";
          });
          barObserver.unobserve(en.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  document
    .querySelectorAll(".skill-bars")
    .forEach((sb) => barObserver.observe(sb));

  /* ==========================
      HERO + ABOUT visible instantly
  ========================== */
  document.querySelectorAll("#home, #about").forEach((el) =>
    el.classList.add("visible")
  );

});

/* ==========================
   NAV GLOW + THEME + TILT
========================== */

document.addEventListener("mousemove", (e) => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const rect = nav.getBoundingClientRect();
  const dist = Math.abs(e.clientY - (rect.top + rect.height / 2));

  nav.style.boxShadow =
    dist < 140
      ? "0 0 22px rgba(0,234,255,0.35), 0 0 40px rgba(177,70,255,0.35)"
      : "";
});

/* CARD TILT */
document.querySelectorAll(".premium-tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    card.style.transform = `rotateX(${(y / 20) * -1}deg) rotateY(${x / 20}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

/* THEME TOGGLE */
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || (!savedTheme && systemLight)) {
  document.body.classList.add("light");
  themeIcon.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  themeIcon.textContent = light ? "☀️" : "🌙";
  localStorage.setItem("theme", light ? "light" : "dark");
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
