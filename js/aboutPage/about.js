document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("aboutVideo");
  if (!video || !("IntersectionObserver" in window)) return;

  video.muted = true;
  video.setAttribute("muted", "");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(video);
});
