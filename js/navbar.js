document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navbarToggle");
  const menu = document.getElementById("navbarMenu");
  const overlay = document.getElementById("navbarOverlay");

  const closeMenu = () => {
    menu.classList.remove("active");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    if (overlay) overlay.classList.remove("active");
  };

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isActive = menu.classList.toggle("active");
      toggle.classList.toggle("active", isActive);
      toggle.setAttribute("aria-expanded", String(isActive));
      if (overlay) overlay.classList.toggle("active", isActive);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    if (overlay) {
      overlay.addEventListener("click", closeMenu);
    }
  }

  if (navbar) {
    const updateNavbarState = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };
    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState);
  }
});
