const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) {
      return;
    }

    const id = `#${visible.target.id}`;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === id);
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.2, 0.45, 0.7],
  }
);

sections.forEach((section) => observer.observe(section));
