// ================== Update Video Source Based on Screen Size ==================
function updateVideoSource() {
  const videoElement = document.getElementById("video-background");
  const fallbackImage = document.getElementById("fallback");

  if (window.innerWidth <= 768) {
    // Mobile devices → load the lightweight version
    videoSource = "videos/amj-home-vid-SMALL.mp4";
  } else {
    // Desktop (main experience) → load the full-quality video
    videoSource = "videos/amj-home-vid-BIG.mp4";
  }

  // Always update video source and try to play
  videoElement.src = videoSource;
  videoElement.load();
  videoElement
    .play()
    .then(() => {
      videoElement.style.display = "block";
      fallbackImage.style.display = "none";
    })
    .catch((error) => {
      console.warn("Video failed to autoplay. Showing fallback:", error);
      videoElement.style.display = "none";
      fallbackImage.style.display = "block";
    });
}

window.addEventListener("load", updateVideoSource);
window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(updateVideoSource, 200);
});
