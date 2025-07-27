// ================== Update Video Source Based on Screen Size ==================
function updateVideoSource() {
  const sourceElement = document.getElementById("videoSource");
  const videoElement = document.getElementById("video-background");

  if (!videoElement || !sourceElement) return;

  const isMobile = window.innerWidth <= 768;
  const desiredSource = isMobile
    ? "videos/amj-home-vid-SMALL-compressed.mp4"
    : "videos/amj-home-vid-BIG-compressed.mp4";

  if (sourceElement.src.includes(desiredSource)) return;

  sourceElement.src = desiredSource;
  videoElement.load();
}

// ============== Get Year For Footer =============== //
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".navbar__toggle");
  const links = document.querySelector(".navbar__links");

  toggle.addEventListener("click", function () {
    links.classList.toggle("active");
  });

  // Optional: Close menu when a link is clicked (for single-page navigation)
  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("active");
    });
  });
});

// ============ links with # ============== //
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, null, " "); // removes # from URL
  }
}
