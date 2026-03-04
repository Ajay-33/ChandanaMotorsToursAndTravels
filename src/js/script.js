// script.js (UPDATED AND SIMPLIFIED)

document.addEventListener("DOMContentLoaded", function () {

  // --- DYNAMIC CONTENT INJECTION ---

  // 1. Generate Gallery from Constants
  const generateGallery = () => {
    const wrapper = document.getElementById("gallery-wrapper");
    if (!wrapper || !AppConstants.GALLERY_IMAGES) return;

    let galleryHtml = '';
    AppConstants.GALLERY_IMAGES.forEach(image => {
      galleryHtml += `
        <div class="swiper-slide gallery-item">
          <div class="gallery-image-container">
            <img src="${image.src}" alt="${image.alt}" class="gallery-image" loading="lazy" decoding="async" width="1600" height="900">
            <div class="gallery-overlay">
              <div class="gallery-info">
                <h3 class="text-xl font-bold text-yellow-400">${image.title}</h3>
                <p class="text-gray-200">${image.details}</p>
              </div>
            </div>
          </div>
        </div>`;
    });
    wrapper.innerHTML = galleryHtml;
  };

  // 1.1 Generate Caravan Showcase (main attraction) from constants
  const generateCaravanShowcase = () => {
    const { CARAVAN_SHOWCASE } = AppConstants;
    if (!CARAVAN_SHOWCASE) return;

    const titleEl = document.getElementById("caravan-title");
    const subtitleEl = document.getElementById("caravan-subtitle");
    const videoTitleEl = document.getElementById("caravan-video-title");
    const videoDescriptionEl = document.getElementById("caravan-video-description");
    const videoEl = document.getElementById("caravan-video");
    const videoSourceEl = document.getElementById("caravan-video-source");
    const videoFallbackEl = document.getElementById("caravan-video-fallback");
    const photoGridEl = document.getElementById("caravan-photo-grid");

    if (titleEl) titleEl.textContent = CARAVAN_SHOWCASE.TITLE || "Caravan Collection";
    if (subtitleEl) subtitleEl.textContent = CARAVAN_SHOWCASE.SUBTITLE || "Our premium caravan experiences.";

    if (videoTitleEl) videoTitleEl.textContent = CARAVAN_SHOWCASE.VIDEO?.title || "Caravan Walkthrough";
    if (videoDescriptionEl) videoDescriptionEl.textContent = CARAVAN_SHOWCASE.VIDEO?.description || "Watch our featured caravan video.";

    if (videoEl && videoSourceEl) {
      const videoSrc = CARAVAN_SHOWCASE.VIDEO?.src || "";
      const videoPoster = CARAVAN_SHOWCASE.VIDEO?.poster || "";

      videoSourceEl.src = videoSrc;
      if (videoPoster) videoEl.setAttribute("poster", videoPoster);
      videoEl.load();

      videoEl.addEventListener("error", () => {
        if (videoFallbackEl) videoFallbackEl.classList.remove("hidden");
      });
    }

    if (photoGridEl && Array.isArray(CARAVAN_SHOWCASE.PHOTOS)) {
      let photoHtml = "";
      CARAVAN_SHOWCASE.PHOTOS.forEach((photo) => {
        photoHtml += `
          <article class="caravan-photo-card" role="button" tabindex="0" aria-label="Open ${photo.title || "Caravan image"}">
            <img src="${photo.src}" alt="${photo.alt}" class="caravan-photo-image" loading="lazy" decoding="async" width="1600" height="900">
            <div class="caravan-photo-overlay">
              <h4 class="text-lg font-bold text-yellow-400">${photo.title}</h4>
              <p class="text-sm text-gray-200 mt-1">${photo.details}</p>
            </div>
          </article>`;
      });
      photoGridEl.innerHTML = photoHtml;
    }
  };

  // 2. Populate Contact Info from Constants
  const populateContactInfo = () => {
    const { CONTACT } = AppConstants;
    if (!CONTACT) return;

    const whatsappLink = `https://wa.me/${CONTACT.WHATSAPP}?text=Hello%20CMT%20Travels`;

    // Page links
    document.getElementById('cta-call-now')?.setAttribute('href', `tel:${CONTACT.PHONE_PRIMARY}`);

    // Terminal links
    document.getElementById('terminal-phone')?.setAttribute('href', `tel:${CONTACT.PHONE_PRIMARY}`);
    document.getElementById('terminal-whatsapp')?.setAttribute('href', whatsappLink);
    document.getElementById('terminal-email')?.setAttribute('href', `mailto:${CONTACT.EMAIL}`);

    // Footer links
    document.getElementById('footer-facebook')?.setAttribute('href', CONTACT.FACEBOOK_URL);
    document.getElementById('footer-twitter')?.setAttribute('href', CONTACT.TWITTER_URL);
    document.getElementById('footer-linkedin')?.setAttribute('href', CONTACT.LINKEDIN_URL);
    document.getElementById('footer-whatsapp')?.setAttribute('href', whatsappLink);

    const footerPhone1 = document.getElementById('footer-phone-1');
    if (footerPhone1) {
      footerPhone1.setAttribute('href', `tel:${CONTACT.PHONE_PRIMARY}`);
      footerPhone1.textContent = CONTACT.PHONE_PRIMARY;
    }
    const footerPhone2 = document.getElementById('footer-phone-2');
    if (footerPhone2) {
      footerPhone2.setAttribute('href', `tel:${CONTACT.PHONE_SECONDARY}`);
      footerPhone2.textContent = CONTACT.PHONE_SECONDARY;
    }
    const footerPhone3 = document.getElementById('footer-phone-3');
    if (footerPhone3) {
      footerPhone3.setAttribute('href', `tel:${CONTACT.PHONE_TERTIARY}`);
      footerPhone3.textContent = CONTACT.PHONE_TERTIARY;
    }

    const footerEmailLink = document.getElementById('footer-email-link');
    if (footerEmailLink) footerEmailLink.setAttribute('href', `mailto:${CONTACT.EMAIL}`);
    const footerEmailText = document.getElementById('footer-email-text');
    if (footerEmailText) footerEmailText.textContent = CONTACT.EMAIL;

    // Floating Action Button (FAB) links
    document.getElementById('fab-whatsapp')?.setAttribute('href', whatsappLink);
    document.getElementById('fab-phone')?.setAttribute('href', `tel:${CONTACT.PHONE_PRIMARY}`);

    // Mobile Nav Overlay links
    document.getElementById('mobile-nav-facebook')?.setAttribute('href', CONTACT.FACEBOOK_URL);
    document.getElementById('mobile-nav-twitter')?.setAttribute('href', CONTACT.TWITTER_URL);
    document.getElementById('mobile-nav-linkedin')?.setAttribute('href', CONTACT.LINKEDIN_URL);
    document.getElementById('mobile-nav-whatsapp')?.setAttribute('href', whatsappLink);
    document.getElementById('mobile-nav-call')?.setAttribute('href', `tel:${CONTACT.PHONE_PRIMARY}`);
  };

  // --- INITIALIZE DYNAMIC CONTENT & FEATURES ---
  generateGallery();
  generateCaravanShowcase();
  populateContactInfo();

  // --- DYNAMIC SECTION HEIGHT ---
  const navbar = document.getElementById("navbar");
  const dynamicSections = document.querySelectorAll(".min-h-dynamic");
  function adjustSectionHeight() {
    const navbarHeight = navbar?.offsetHeight || 64; // Fallback to ~64px if not available
    const windowHeight = window.innerHeight;
    const minHeight = Math.max(windowHeight - navbarHeight, 400); // Minimum 400px
    dynamicSections.forEach((section) => {
      section.style.minHeight = `${minHeight}px`;
    });
  }
  // Use a small delay to ensure navbar is fully rendered
  setTimeout(adjustSectionHeight, 100);
  window.addEventListener("resize", adjustSectionHeight);

  // --- PARTICLES.JS INITIALIZATION (Lazy-loaded, waits for particlesJS) ---
  const initParticles = () => {
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: 3, random: true },
          line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.2, width: 1 },
          move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false },
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
          modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } },
        },
        retina_detect: true,
      });
    } else {
      // Retry if not yet loaded
      setTimeout(initParticles, 100);
    }
  };
  // Defer particles init slightly to allow lazy-loading
  setTimeout(initParticles, 500);

  // --- REWRITTEN & SIMPLIFIED: MOBILE MENU OVERLAY LOGIC ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenuCloseButton = document.getElementById("mobile-menu-close-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinksInOverlay = document.querySelectorAll("#mobile-menu .nav-link");

  const openMenu = () => {
    mobileMenu.classList.add("open");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
  };

  mobileMenuButton.addEventListener("click", openMenu);
  mobileMenuCloseButton.addEventListener("click", closeMenu);

  // Close menu when a link inside it is clicked
  mobileNavLinksInOverlay.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // --- SMOOTH SCROLL & NAVBAR LOGIC ---
  const allNavLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  allNavLinks.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });

  // --- NAVBAR BACKGROUND ON SCROLL ---
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // --- SCROLLSPY FOR ACTIVE NAV LINK UNDERLINE ---
  const sections = document.querySelectorAll("main section");
  const desktopNavLinks = document.querySelectorAll(".nav-links .nav-link");
  const mobileNavLinks = document.querySelectorAll("#mobile-menu .nav-link");

  function changeLinkState() {
    let index = sections.length;
    while (--index && window.scrollY + 100 < sections[index].offsetTop) { }
    function setActive(links) {
      links.forEach((link) => link.classList.remove("active"));
      if (links[index]) {
        links[index].classList.add("active");
      }
    }
    setActive(desktopNavLinks);
    setActive(mobileNavLinks);
  }
  changeLinkState();
  window.addEventListener("scroll", changeLinkState);

  // --- SCROLL-TRIGGERED FADE-IN ANIMATIONS ---
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 }
  );
  fadeElements.forEach((element) => observer.observe(element));

  // --- ENHANCED GALLERY MODAL LOGIC (FIXED) ---
  const setupGalleryModal = () => {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const downloadLink = document.getElementById("download-link");
    const closeModalBtn = document.getElementById("close-modal");
    const galleryItems = document.querySelectorAll(".gallery-item, .caravan-photo-card");
    const openImageInModal = (item) => {
        const targetImage = item.querySelector("img");
        if (!targetImage) return;
        const imgSrc = targetImage.src;
        const imgAlt = targetImage.alt;

        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;

        downloadLink.href = imgSrc;
        downloadLink.download = `CMT_Travels-${imgAlt.toLowerCase().replace(/\s+/g, "-")}.jpg`;

        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    };

    galleryItems.forEach((item) => {
      item.addEventListener("click", () => openImageInModal(item));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openImageInModal(item);
        }
      });
    });

    const closeModal = () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";

    };

    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
    });
  };

  // --- SWIPER INITIALIZATION (Lazy-loaded, waits for Swiper) ---
  const initializeSwiper = () => {
    if (typeof Swiper !== "undefined") {
      const modal = document.getElementById("image-modal");
      var swiper = new Swiper(".gallery-container", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        speed: 600,
        autoplay: { delay: 4000, disableOnInteraction: false },
        coverflowEffect: { rotate: 5, stretch: 0, depth: 100, modifier: 2, slideShadows: true },
        pagination: { el: ".swiper-pagination", clickable: true, dynamicBullets: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        scrollbar: { el: ".swiper-scrollbar", draggable: true },
        breakpoints: { 768: { coverflowEffect: { rotate: 10, stretch: -20, depth: 150, modifier: 2 } } },
      });

      document.addEventListener("keydown", (e) => {
        if (modal.classList.contains("show") && e.key === "ArrowRight") swiper.slideNext();
        if (modal.classList.contains("show") && e.key === "ArrowLeft") swiper.slidePrev();
      });
    } else {
      // Retry if not yet loaded
      setTimeout(initializeSwiper, 100);
    }
  };
  // Defer swiper init until library is lazy-loaded
  setTimeout(initializeSwiper, 1000);
  setupGalleryModal();


  // --- EMAILJS FORM SUBMISSION (Lazy-loaded, waits for emailjs library) ---
  const contactForm = document.getElementById("contact-form");
  const responseMessage = document.getElementById("response-message");
  const submitBtn = document.getElementById("submit-button");
  const firstNameInput = document.getElementById("firstName");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const allInputs = [firstNameInput, phoneInput, emailInput];

  // Initialize EmailJS only after library is lazy-loaded
  const initEmailJS = () => {
    if (typeof emailjs === "undefined") {
      setTimeout(initEmailJS, 100);
      return;
    }
    (function () {
      emailjs.init(emailjsConfig.publicKey);
    })();
  };
  setTimeout(initEmailJS, 500);

  // --- VALIDATION FUNCTION ---
  const validateForm = () => {
    const errors = [];

    allInputs.forEach(input => input.classList.remove('error'));
    responseMessage.textContent = "";
    responseMessage.className = "mt-4 text-center text-base";

    if (firstNameInput.value.trim() === "") {
      errors.push("First name is required.");
      firstNameInput.classList.add("error");
    }

    const phoneValue = phoneInput.value.replace(/\D/g, '');
    if (phoneValue.length < 10) {
      errors.push("Please enter a valid phone number with at least 10 digits.");
      phoneInput.classList.add("error");
    }

    const emailValue = emailInput.value.trim();
    if (emailValue !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
        errors.push("Please enter a valid email address.");
        emailInput.classList.add("error");
      }
    }

    return errors;
  };


  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      responseMessage.textContent = validationErrors[0];
      responseMessage.className = "mt-4 text-center text-base text-red-400";
      return;
    }

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>`;

    const serviceID = emailjsConfig.serviceID;
    const templateID = emailjsConfig.templateID;

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        responseMessage.textContent = "Message sent! We will get back to you soon.";
        responseMessage.className = "mt-4 text-center text-base text-green-400";
        contactForm.reset();
        setTimeout(() => {
          responseMessage.textContent = "";
        }, 5000);
      },
      (err) => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        responseMessage.textContent = "Failed to send message. Please try again.";
        responseMessage.className = "mt-4 text-center text-base text-red-400";
      }
    );
  });

  // --- DYNAMIC COPYRIGHT YEAR ---
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});