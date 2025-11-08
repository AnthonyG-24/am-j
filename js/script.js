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

// ============== Navbar code =============== //
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

// ================== Modal Functionality ==================
function openModal() {
  document.getElementById("contactModal").style.display = "block";
}

function closeModal() {
  document.getElementById("contactModal").style.display = "none";
}

// Optional: Close modal when clicking outside of it
window.onclick = function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// ================== Contact Form Validation ==================
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  const email = form.email.value.trim();
  const phone = form.phone.value.trim();

  if (!email && !phone) {
    e.preventDefault(); // stop form submission
    alert("Please provide at least your email or phone number.");
  }
});

// ================== Notification Banner ==================
function closeNotification() {
  const banner = document.getElementById("notification-banner");
  if (banner) {
    banner.classList.add("hidden");
    // Remove the banner from DOM after animation completes
    setTimeout(() => {
      banner.style.display = "none";
    }, 500);
  }
}
