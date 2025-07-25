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
document.getElementById("year").textContent = new Date().getFullYear();
