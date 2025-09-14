// script.js (CORRECTED AND FINAL VERSION)

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
            <img src="${image.src}" alt="${image.alt}" class="gallery-image">
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
  };

  // --- INITIALIZE DYNAMIC CONTENT & FEATURES ---
  generateGallery();
  populateContactInfo();

  // --- DYNAMIC SECTION HEIGHT ---
  const navbar = document.getElementById("navbar");
  const dynamicSections = document.querySelectorAll(".min-h-dynamic");
  function adjustSectionHeight() {
    const navbarHeight = navbar.offsetHeight;
    const windowHeight = window.innerHeight;
    dynamicSections.forEach((section) => {
      section.style.minHeight = `${windowHeight - navbarHeight}px`;
    });
  }
  adjustSectionHeight();
  window.addEventListener("resize", adjustSectionHeight);

  // --- PARTICLES.JS INITIALIZATION ---
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
  }

  // --- MOBILE MENU TOGGLE ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex-col");
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
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("flex-col");
        }
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
    const galleryItems = document.querySelectorAll(".gallery-item");
    let objectUrl = null; // This will hold the temporary URL

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            const imgSrc = item.querySelector("img").src;
            const imgAlt = item.querySelector("img").alt;
            
            modalImg.src = imgSrc;
            modalImg.alt = imgAlt;

            // Before creating a new link, disable the old one to prevent errors
            downloadLink.href = '#';
            
            // 1. Fetch the image data from its source
            fetch(imgSrc)
                .then(response => response.blob()) // 2. Convert the response to a Blob
                .then(blob => {
                    // 3. Create a temporary, local URL for the Blob
                    objectUrl = URL.createObjectURL(blob);
                    
                    // 4. Set the download link to use this secure, temporary URL
                    downloadLink.href = objectUrl;
                    downloadLink.download = `CMT_Travels-${imgAlt.toLowerCase().replace(/\s+/g, "-")}.jpg`;
                })
                .catch(e => console.error("Could not create download link:", e)); 

            modal.classList.add("show");
            document.body.style.overflow = "hidden";
        });
    });

    const closeModal = () => {
        modal.classList.remove("show");
        document.body.style.overflow = "";
        
        // --- CLEANUP LOGIC ---
        // When the modal closes, release the temporary URL to free up browser memory
        if (objectUrl) {
            URL.revokeObjectURL(objectUrl);
            objectUrl = null;
        }
    };

    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) closeModal();
    });
  };

  // --- SWIPER INITIALIZATION ---
  const initializeSwiper = () => {
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
  };

  // Initialize plugins AFTER dynamic content is ready
  initializeSwiper();
  setupGalleryModal();


  // --- EMAILJS FORM SUBMISSION ---
  const contactForm = document.getElementById("contact-form");
  const responseMessage = document.getElementById("response-message");
  const submitBtn = document.getElementById("submit-button");

  (function () {
    // IMPORTANT: Replace with your actual EmailJS Public Key
    emailjs.init(emailjsConfig.publicKey);
  })();

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
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
        setTimeout(() => { responseMessage.textContent = ""; }, 5000);
      },
      (err) => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        responseMessage.textContent = "Failed to send message. Please try again.";
        responseMessage.className = "mt-4 text-center text-base text-red-400";
        // console.error("EmailJS Error:", JSON.stringify(err)); 
      }
    );
  });

  // --- DYNAMIC COPYRIGHT YEAR ---
  const copyrightYear = document.getElementById("copyright-year");
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});