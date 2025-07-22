const video = document.getElementById("video-background");
const fallbackImg = document.getElementById("fallback");

// When video fails to load or has no sources
video.addEventListener("error", () => {
  fallbackImg.style.display = "block";
  video.style.display = "none";
});

// Optionally also show fallback if video can't play
video.addEventListener("stalled", () => {
  fallbackImg.style.display = "block";
  video.style.display = "none";
});
