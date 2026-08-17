document.addEventListener("DOMContentLoaded", function () {
  // ==========================
  // GET HTML ELEMENTS
  // ==========================

  const trigger = document.getElementById("payComingSoonBtn");
  const modal = document.getElementById("payComingSoonModal");
  const closeButton = document.getElementById("payComingSoonClose");

  // ==========================
  // COMING SOON MODAL
  // ==========================

  function openModal() {
    modal.classList.add("active");

    // Stop page scrolling
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");

    // Allow page scrolling again
    document.body.style.overflow = "";
  }

  trigger.addEventListener("click", function (event) {
    event.preventDefault();
    openModal();
  });

  closeButton.addEventListener("click", function () {
    closeModal();
  });

  // ==========================
  // CLICK OUTSIDE TO CLOSE
  // ==========================

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // ==========================
  // KEYBOARD CONTROLS
  // ==========================

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
