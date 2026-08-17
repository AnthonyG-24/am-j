document.addEventListener("DOMContentLoaded", function () {
  // ==========================
  // GET HTML ELEMENTS
  // ==========================

  const prevButton = document.getElementById("workPrev");
  const track = document.getElementById("workTrack");
  const nextButton = document.getElementById("workNext");

  const cards = document.querySelectorAll(".work-card-btn");

  // Lightbox elements
  const lightbox = document.getElementById("workLightbox");

  const lightboxImage = document.getElementById("workLightboxImg");

  const lightboxCaption = document.getElementById("workLightboxCaption");

  const closeButton = document.getElementById("workLightboxClose");

  const lightboxPrevButton = document.getElementById("workLightboxPrev");

  const lightboxNextButton = document.getElementById("workLightboxNext");

  // ==========================
  // GALLERY BUTTONS
  // ==========================

  const moveAmount = 300;

  // Move gallery right
  nextButton.addEventListener("click", function () {
    track.scrollBy({
      left: moveAmount,
      behavior: "smooth",
    });
  });

  // Move gallery left
  prevButton.addEventListener("click", function () {
    track.scrollBy({
      left: -moveAmount,
      behavior: "smooth",
    });
  });

  // ==========================
  // LIGHTBOX
  // ==========================

  let currentImage = 0;

  // Open image popup
  function openLightbox(imageIndex) {
    currentImage = imageIndex;

    // Find the button that was clicked
    const clickedCard = cards[currentImage];

    // Find the image inside that button
    const image = clickedCard.querySelector("img");

    // Change lightbox image
    lightboxImage.src = image.src;

    // Change image description
    lightboxImage.alt = image.alt;

    // Change caption
    lightboxCaption.textContent = clickedCard.getAttribute("data-caption");

    // Show lightbox
    lightbox.classList.add("active");

    // Stop page scrolling
    document.body.style.overflow = "hidden";
  }

  // Close image popup
  function closeLightbox() {
    lightbox.classList.remove("active");

    // Allow page scrolling again
    document.body.style.overflow = "";
  }

  // ==========================
  // WHEN A PHOTO IS CLICKED
  // ==========================

  cards.forEach(function (card, index) {
    card.addEventListener("click", function () {
      openLightbox(index);
    });
  });

  // ==========================
  // LIGHTBOX BUTTONS
  // ==========================

  closeButton.addEventListener("click", function () {
    closeLightbox();
  });

  lightboxNextButton.addEventListener("click", function () {
    currentImage = currentImage + 1;

    // If we go past the last image
    if (currentImage >= cards.length) {
      currentImage = 0;
    }

    openLightbox(currentImage);
  });

  lightboxPrevButton.addEventListener("click", function () {
    currentImage = currentImage - 1;

    // If we go before the first image
    if (currentImage < 0) {
      currentImage = cards.length - 1;
    }

    openLightbox(currentImage);
  });

  // ==========================
  // CLICK OUTSIDE TO CLOSE
  // ==========================

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // ==========================
  // KEYBOARD CONTROLS
  // ==========================

  document.addEventListener("keydown", function (event) {
    // Close with ESC
    if (event.key === "Escape") {
      closeLightbox();
    }

    // Previous image
    if (event.key === "ArrowLeft") {
      currentImage--;

      if (currentImage < 0) {
        currentImage = cards.length - 1;
      }

      openLightbox(currentImage);
    }

    // Next image
    if (event.key === "ArrowRight") {
      currentImage++;

      if (currentImage >= cards.length) {
        currentImage = 0;
      }

      openLightbox(currentImage);
    }
  });
});
