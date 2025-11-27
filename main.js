<<<<<<< HEAD
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

  document
    .querySelectorAll(
      ".animate-on-scroll, .glass, .project-card, .skill-card, .timeline-item, .edu-card"
    )
    .forEach((el) => observer.observe(el));

  /* ==========================
      SKILL BAR ANIMATION
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
      CONTACT FORM
  ========================== */
  window.submitContact = function (e) {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !message) {
      if (status) status.textContent = "Please fill all fields.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:vaishnavratheesh007@gmail.com?subject=${subject}&body=${body}`;

    if (status) status.textContent = "Opening your email client...";
  };

  window.clearForm = function () {
    const form = document.getElementById("contactForm");
    if (form) form.reset();
    const s = document.getElementById("formStatus");
    if (s) s.textContent = "";
  };

  /* ==========================
      FOOTER EYE TRACKING
  ========================== */
  const eyes = document.querySelectorAll(".eye");
  document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const moveX = Math.cos(angle) * 6;
      const moveY = Math.sin(angle) * 6;

      eye.querySelector(".pupil").style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  /* ==========================
      HERO + ABOUT instantly visible
  ========================== */
  document.querySelectorAll("#home, #about").forEach((el) => {
    el.classList.add("visible");
  });

});

/* ==========================
   FOOTER ORB PARALLAX
========================== */
document.addEventListener("mousemove", (e) => {
  const orb = document.querySelector(".footer-orb");
  if (!orb) return;

  const rect = orb.getBoundingClientRect();
  const x = e.clientX - (rect.left + rect.width / 2);
  const y = e.clientY - (rect.top + rect.height / 2);

  orb.style.transform = `translateY(0) rotateX(${(y / 40) * -1}deg) rotateY(${x / 40}deg)`;
});

/* ==========================
   GLOBAL CARD TILT
========================== */
document.querySelectorAll(".premium-tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);

    card.style.transform = `rotateX(${(y / 20) * -1}deg) rotateY(${
      x / 20
    }deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

/* ==========================
   NAVBAR PROXIMITY GLOW
========================== */
const nav = document.querySelector(".nav");

document.addEventListener("mousemove", (e) => {
  const rect = nav.getBoundingClientRect();
  const dist = Math.abs(e.clientY - (rect.top + rect.height / 2));

  if (dist < 140) {
    nav.style.boxShadow =
      "0 0 22px rgba(0,234,255,0.35), 0 0 40px rgba(177,70,255,0.35)";
    nav.style.transform = "translateY(-4px)";
  } else {
    nav.style.boxShadow = "";
    nav.style.transform = "";
  }
});

/* ==========================
   THEME TOGGLE (FINAL, WORKING)
========================== */
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || (!savedTheme && systemLight)) {
  document.body.classList.add("light");
  themeIcon.textContent = "☀️";
} else {
  document.body.classList.remove("light");
  themeIcon.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");

  themeIcon.textContent = light ? "☀️" : "🌙";
  localStorage.setItem("theme", light ? "light" : "dark");

  document.body.style.transition = "background 0.45s ease, color 0.45s ease";
  setTimeout(() => (document.body.style.transition = ""), 600);
});
=======
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

  document
    .querySelectorAll(
      ".animate-on-scroll, .glass, .project-card, .skill-card, .timeline-item, .edu-card"
    )
    .forEach((el) => observer.observe(el));

  /* ==========================
      SKILL BAR ANIMATION
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
      CONTACT FORM
  ========================== */
  window.submitContact = function (e) {
    e.preventDefault();
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();
    const status = document.getElementById("formStatus");

    if (!name || !email || !message) {
      if (status) status.textContent = "Please fill all fields.";
      return;
    }

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);

    window.location.href = `mailto:vaishnavratheesh007@gmail.com?subject=${subject}&body=${body}`;

    if (status) status.textContent = "Opening your email client...";
  };

  window.clearForm = function () {
    const form = document.getElementById("contactForm");
    if (form) form.reset();
    const s = document.getElementById("formStatus");
    if (s) s.textContent = "";
  };

  /* ==========================
      FOOTER EYE TRACKING
  ========================== */
  const eyes = document.querySelectorAll(".eye");
  document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const moveX = Math.cos(angle) * 6;
      const moveY = Math.sin(angle) * 6;

      eye.querySelector(".pupil").style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  /* ==========================
      HERO + ABOUT instantly visible
  ========================== */
  document.querySelectorAll("#home, #about").forEach((el) => {
    el.classList.add("visible");
  });

});

/* ==========================
   FOOTER ORB PARALLAX
========================== */
document.addEventListener("mousemove", (e) => {
  const orb = document.querySelector(".footer-orb");
  if (!orb) return;

  const rect = orb.getBoundingClientRect();
  const x = e.clientX - (rect.left + rect.width / 2);
  const y = e.clientY - (rect.top + rect.height / 2);

  orb.style.transform = `translateY(0) rotateX(${(y / 40) * -1}deg) rotateY(${x / 40}deg)`;
});

/* ==========================
   GLOBAL CARD TILT
========================== */
document.querySelectorAll(".premium-tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);

    card.style.transform = `rotateX(${(y / 20) * -1}deg) rotateY(${
      x / 20
    }deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

/* ==========================
   NAVBAR PROXIMITY GLOW
========================== */
const nav = document.querySelector(".nav");

document.addEventListener("mousemove", (e) => {
  const rect = nav.getBoundingClientRect();
  const dist = Math.abs(e.clientY - (rect.top + rect.height / 2));

  if (dist < 140) {
    nav.style.boxShadow =
      "0 0 22px rgba(0,234,255,0.35), 0 0 40px rgba(177,70,255,0.35)";
    nav.style.transform = "translateY(-4px)";
  } else {
    nav.style.boxShadow = "";
    nav.style.transform = "";
  }
});

/* ==========================
   THEME TOGGLE (FINAL, WORKING)
========================== */
const themeBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "light" || (!savedTheme && systemLight)) {
  document.body.classList.add("light");
  themeIcon.textContent = "☀️";
} else {
  document.body.classList.remove("light");
  themeIcon.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");

  themeIcon.textContent = light ? "☀️" : "🌙";
  localStorage.setItem("theme", light ? "light" : "dark");

  document.body.style.transition = "background 0.45s ease, color 0.45s ease";
  setTimeout(() => (document.body.style.transition = ""), 600);
});
>>>>>>> 227981bb392afe580a10cd8302c61641e48cffc5
