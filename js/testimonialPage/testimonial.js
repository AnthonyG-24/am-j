document.addEventListener("DOMContentLoaded", function () {
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialDots = document.querySelectorAll(".testimonial-dot");
  const testimonialPrev = document.getElementById("testimonialPrev");
  const testimonialNext = document.getElementById("testimonialNext");
  let testimonialIndex = 0;

  const updateTestimonialTrackHeight = () => {
    if (!testimonialTrack) return;
    const activeSlide = document.querySelector(".testimonial-slide.active");
    if (activeSlide) {
      testimonialTrack.style.height = activeSlide.offsetHeight + "px";
    }
  };

  const showTestimonial = (index) => {
    testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides.forEach((slide) => {
      slide.classList.toggle("active", Number(slide.getAttribute("data-index")) === testimonialIndex);
    });

    testimonialDots.forEach((dot) => {
      dot.classList.toggle("active", Number(dot.getAttribute("data-index")) === testimonialIndex);
    });

    updateTestimonialTrackHeight();
  };

  if (testimonialSlides.length) {
    testimonialPrev.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
    testimonialNext.addEventListener("click", () => showTestimonial(testimonialIndex + 1));

    testimonialDots.forEach((dot) => {
      dot.addEventListener("click", () => showTestimonial(Number(dot.getAttribute("data-index"))));
    });

    updateTestimonialTrackHeight();
    window.addEventListener("resize", updateTestimonialTrackHeight);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateTestimonialTrackHeight);
    }
  }
});
