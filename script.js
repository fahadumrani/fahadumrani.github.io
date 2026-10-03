// ===== PORTFOLIO SCRIPT =====
// Mobile menu, navbar state, active link, scroll reveal,
// back-to-top, contact form validation, dynamic year.

// ----- 1. Mobile menu -----
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

const closeMenu = () => {
  navLinks.classList.remove("open");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
};

hamburger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  hamburger.classList.toggle("open", open);
  hamburger.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeMenu();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) closeMenu();
});

// ----- 2 & 4. Unified scroll state (navbar, active link, back-to-top) -----
// Scroll handling lives in section 2/4 below; all listeners share one
// rAF-throttled handler so a single scroll event drives every effect.

// ----- 3. Scroll-reveal animations -----
const revealTargets = document.querySelectorAll(
  ".section-title, .section-desc, .about-text, .about-facts, .about-photo, .skill-card, .project-card, .timeline-item, .contact-text, .contact-list, .contact-form"
);

revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

// ----- 4. Active nav link, navbar shadow & back-to-top (unified) -----
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("to-top");
const sections = document.querySelectorAll("main section[id]");
const linkMap = new Map(
  [...navLinks.querySelectorAll("a")].map((a) => [a.getAttribute("href").slice(1), a])
);

const onScroll = () => {
  const y = window.scrollY;

  navbar.classList.toggle("scrolled", y > 10);
  backToTop.hidden = y < 400;

  let current = "home";
  sections.forEach((sec) => {
    if (y >= sec.offsetTop - 140) current = sec.id;
  });
  linkMap.forEach((link, id) => link.classList.toggle("active", id === current));
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    onScroll();
    ticking = false;
  });
}, { passive: true });

onScroll(); // initial state

backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// ----- 5. Contact form (front-end validation demo) -----
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = ["name", "email", "message"].map((id) => document.getElementById(id));
  let valid = true;

  fields.forEach((field) => {
    const empty = !field.value.trim();
    const badEmail = field.type === "email" && !/^\S+@\S+\.\S+$/.test(field.value);
    field.classList.toggle("invalid", empty || badEmail);
    if (empty || badEmail) valid = false;
  });

  if (!valid) {
    formStatus.textContent = "Please fill in all fields with a valid email.";
    formStatus.className = "form-status err";
    return;
  }

  // ✏️ Hook this up to your own backend / email service (e.g. Formspree).
  formStatus.textContent = "Thanks! Your message has been sent (demo).";
  formStatus.className = "form-status ok";
  form.reset();
});

// remove error styling while typing
form.querySelectorAll("input, textarea").forEach((el) =>
  el.addEventListener("input", () => el.classList.remove("invalid"))
);

// ----- 6. Footer year -----
document.getElementById("year").textContent = new Date().getFullYear();
