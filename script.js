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

document.querySelectorAll("[data-feedback-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".feedback-track");
  const slides = [...carousel.querySelectorAll(".feedback-slide")];
  const dots = [...carousel.querySelectorAll(".feedback-dot")];

  if (!track || slides.length < 2) {
    return;
  }

  let index = 0;
  let intervalId = null;

  const setSlide = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
    });
  };

  const startAutoSlide = () => {
    clearInterval(intervalId);
    intervalId = window.setInterval(() => {
      setSlide(index + 1);
    }, 2000);
  };

  const stopAutoSlide = () => {
    clearInterval(intervalId);
  };

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => {
      setSlide(dotIndex);
      startAutoSlide();
    });
  });

  carousel.addEventListener("mouseenter", stopAutoSlide);
  carousel.addEventListener("mouseleave", startAutoSlide);
  carousel.addEventListener("focusin", stopAutoSlide);
  carousel.addEventListener("focusout", startAutoSlide);

  setSlide(0);
  startAutoSlide();
});
