document.addEventListener("DOMContentLoaded", function () {
  const contactEmail = document.getElementById("contactEmail");
  const contactPhone = document.getElementById("contactPhone");

  if (contactEmail && contactPhone) {
    const validateContactMethod = () => {
      if (!contactEmail.value.trim() && !contactPhone.value.trim()) {
        contactEmail.setCustomValidity("Please provide an email or phone number.");
      } else {
        contactEmail.setCustomValidity("");
      }
    };

    contactEmail.addEventListener("input", validateContactMethod);
    contactPhone.addEventListener("input", validateContactMethod);
    contactEmail.addEventListener("invalid", validateContactMethod);
  }

  const serviceRadios = document.querySelectorAll('input[name="serviceType"]');
  const serviceOther = document.getElementById("serviceOther");
  const otherServiceGroup = document.getElementById("otherServiceGroup");
  const otherServiceDetail = document.getElementById("otherServiceDetail");

  if (serviceRadios.length && serviceOther && otherServiceGroup && otherServiceDetail) {
    const toggleOtherService = () => {
      const isOther = serviceOther.checked;
      otherServiceGroup.hidden = !isOther;
      otherServiceDetail.required = isOther;
      if (!isOther) otherServiceDetail.value = "";
    };

    serviceRadios.forEach((radio) => {
      radio.addEventListener("change", toggleOtherService);
    });
  }

  const serviceDetailGroups = {
    "Moving & Relocation": document.getElementById("movingSizeGroup"),
    "Installation & Setup": document.getElementById("installSizeGroup"),
    "Logistics & Delivery": document.getElementById("logisticsSizeGroup"),
    "Aquarium Transportation": document.getElementById("aquariumSizeGroup"),
  };
  const allServiceDetailGroups = Object.values(serviceDetailGroups).filter(Boolean);

  if (serviceRadios.length && allServiceDetailGroups.length) {
    const toggleServiceDetailGroup = () => {
      const selected = document.querySelector('input[name="serviceType"]:checked');
      const groupToShow = selected ? serviceDetailGroups[selected.value] : null;

      allServiceDetailGroups.forEach((group) => {
        const isMatch = group === groupToShow;
        group.hidden = !isMatch;
        if (!isMatch) {
          const field = group.querySelector("input, select");
          if (field) field.value = "";
        }
      });
    };

    serviceRadios.forEach((radio) => {
      radio.addEventListener("change", toggleServiceDetailGroup);
    });
  }

  const addressHint = document.getElementById("addressHint");
  const destinationAddressLabelText = document.getElementById("destinationAddressLabelText");

  const defaultHint =
    "For moves, include both. For installation or delivery, just the service address.";

  const addressBehavior = {
    "Moving & Relocation": {
      destinationLabel: "Delivery Address",
      hint: "Include both your pickup and delivery address.",
    },
    "Installation & Setup": {
      destinationLabel: "Service Address",
      hint: "If we're also hauling something away, include the pickup address too.",
    },
    "Logistics & Delivery": {
      destinationLabel: "Delivery Address",
      hint: "Include a pickup address if we're collecting the item elsewhere.",
    },
    "Aquarium Transportation": {
      destinationLabel: "Delivery Address",
      hint: "Include both your pickup and delivery address.",
    },
  };

  if (addressHint && destinationAddressLabelText) {
    const updateAddressFields = () => {
      const selected = document.querySelector('input[name="serviceType"]:checked');
      const behavior = selected ? addressBehavior[selected.value] : null;

      destinationAddressLabelText.textContent = behavior
        ? behavior.destinationLabel
        : "Delivery / Service Address";

      addressHint.textContent = behavior ? behavior.hint : defaultHint;
    };

    serviceRadios.forEach((radio) => {
      radio.addEventListener("change", updateAddressFields);
    });
  }

  const referralSource = document.getElementById("referralSource");
  const referralOtherGroup = document.getElementById("referralOtherGroup");
  const referralOtherDetail = document.getElementById("referralOtherDetail");

  if (referralSource && referralOtherGroup && referralOtherDetail) {
    referralSource.addEventListener("change", () => {
      const isOther = referralSource.value === "Other";
      referralOtherGroup.hidden = !isOther;
      if (!isOther) referralOtherDetail.value = "";
    });
  }

  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmit");
  const status = document.getElementById("formStatus");

  if (form && submitBtn && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      status.textContent = "";
      status.className = "form-status";

      const body = new URLSearchParams(new FormData(form)).toString();

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      })
        .then((response) => {
          if (!response.ok) throw new Error("Submission failed");
          form.reset();
          if (otherServiceGroup) {
            otherServiceGroup.hidden = true;
            otherServiceDetail.required = false;
          }
          if (referralOtherGroup) {
            referralOtherGroup.hidden = true;
          }
          allServiceDetailGroups.forEach((group) => {
            group.hidden = true;
          });
          if (addressHint && destinationAddressLabelText) {
            destinationAddressLabelText.textContent = "Delivery / Service Address";
            addressHint.textContent = defaultHint;
          }
          status.textContent = "Thanks! Your message was sent — we'll be in touch soon.";
          status.classList.add("form-status-success");
        })
        .catch(() => {
          status.textContent = "Something went wrong sending your message. Please call or email us directly.";
          status.classList.add("form-status-error");
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }
});
