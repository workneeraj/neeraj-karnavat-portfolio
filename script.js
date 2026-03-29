const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveLink() {
  const scrollPosition = window.scrollY + 180;
  const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

  let activeSection = sections[0];

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      activeSection = section;
    }
  });

  if (reachedBottom) {
    activeSection = sections[sections.length - 1];
  }

  const activeId = `#${activeSection.id}`;
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === activeId);
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("resize", updateActiveLink);
window.addEventListener("load", updateActiveLink);

updateActiveLink();
