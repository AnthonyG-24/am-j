document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    console.log("Hamburger clicked"); // debug line
    navLinks.classList.toggle("open");
  });
});

// ================== Update Video Source Based on Screen Size ==================
function updateVideoSource() {
  const videoElement = document.getElementById("video-background");
  const fallbackDiv = document.getElementById("videoFallback");

  if (!videoElement) return;

  let videoSource;
  if (window.innerWidth <= 768) {
    videoSource = "videos/amj-home-vid-SMALL.mp4?v=" + new Date().getTime();
  } else {
    videoSource = "videos/amj-home-vid-BIG.mp4?v=" + new Date().getTime();
  }

  // Only change source if it is different to avoid unnecessary reloads
  if (videoElement.src !== videoSource) {
    videoElement.src = videoSource;
    videoElement.load();
    videoElement
      .play()
      .then(() => {
        videoElement.style.display = "block";
        fallbackDiv.style.display = "none";
      })
      .catch(() => {
        videoElement.style.display = "none";
        fallbackDiv.style.display = "block";
      });
  }
}

window.addEventListener("load", updateVideoSource);
window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(updateVideoSource, 200);
});
