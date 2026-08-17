document.addEventListener("DOMContentLoaded", function () {
  const cta = document.getElementById("floatingCta");
  const hero = document.getElementById("home");

  if (!cta || !hero || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        cta.classList.toggle("visible", !entry.isIntersecting);
      });
    },
    { threshold: 0 }
  );

  observer.observe(hero);
});
