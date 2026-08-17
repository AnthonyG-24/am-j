document.addEventListener("DOMContentLoaded", function () {
  const serviceTabs = document.querySelectorAll(".service-tab");
  const servicePanels = document.querySelectorAll(".service-panel");

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-service");

      serviceTabs.forEach((t) => {
        t.classList.toggle("active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });

      servicePanels.forEach((panel) => {
        panel.classList.toggle("active", panel.getAttribute("data-service") === target);
      });
    });
  });
});
