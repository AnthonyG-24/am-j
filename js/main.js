document.documentElement.classList.add("js-ready");

// Hero Looping Video - Skips the first second to avoid black flash on load
const heroVideo = document.getElementById("hero-bg-video");
const loopStart = 1.5;

heroVideo.addEventListener("loadedmetadata", () => {
  heroVideo.currentTime = loopStart;
  heroVideo.play();
});

heroVideo.addEventListener("ended", () => {
  heroVideo.currentTime = loopStart;
  heroVideo.play();
});
