const navToggle = document.querySelector("[data-nav-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");

function setNavState(isOpen) {
  if (!navToggle || !mobileNav) return;
  navToggle.setAttribute("aria-expanded", String(isOpen));
  mobileNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setNavState(!isOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setNavState(false));
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setNavState(false);
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

const phoneHref = ["t", "e", "l", ":", "+", "1", "4", "2", "5", "7", "9", "1", "9", "9", "7", "5"].join("");
const emailHref = [
  "m",
  "a",
  "i",
  "l",
  "t",
  "o",
  ":",
  "alph",
  "aome",
  "gapr",
  "oserv",
  "ice",
  "@",
  "gma",
  "il",
  ".",
  "com"
].join("");

document.querySelectorAll("[data-contact]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();

    const contactType = trigger.dataset.contact;
    if (contactType === "call") {
      window.location.href = phoneHref;
      return;
    }

    if (contactType === "email") {
      window.location.href = emailHref;
    }
  });
});

const serviceField = document.querySelector("[name='service']");
const params = new URLSearchParams(window.location.search);
const requestedService = params.get("service");

if (serviceField && requestedService) {
  const match = [...serviceField.options].find(
    (option) => option.value.toLowerCase() === requestedService.toLowerCase()
  );
  if (match) serviceField.value = match.value;
}

const estimateForm = document.querySelector("[data-estimate-form]");
const successMessage = document.querySelector("[data-form-success]");

estimateForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(estimateForm);
  const subject = `Estimate Request - ${formData.get("service") || "General Inquiry"}`;

  const body = [
    "Alpha and Omega Pro Services LLC estimate request",
    "",
    `Name: ${formData.get("name") || ""}`,
    `Phone: ${formData.get("phone") || ""}`,
    `Email: ${formData.get("email") || ""}`,
    `Service: ${formData.get("service") || ""}`,
    `Preferred contact: ${formData.get("contactPreference") || ""}`,
    `Project location: ${formData.get("location") || ""}`,
    "",
    "Project details:",
    `${formData.get("details") || ""}`
  ].join("\n");

  if (successMessage) {
    successMessage.classList.add("is-visible");
  }

  window.location.href = `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
