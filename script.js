document.addEventListener("DOMContentLoaded", function () {
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
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.5 } },
          push: { particles_nb: 4 },
        },
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
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
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
    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  fadeElements.forEach((element) => observer.observe(element));

  // --- ENHANCED GALLERY MODAL LOGIC ---
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const downloadLink = document.getElementById("download-link");
  const closeModalBtn = document.getElementById("close-modal");
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      const imgAlt = item.querySelector("img").alt;
      modalImg.src = imgSrc;
      modalImg.alt = imgAlt;
      downloadLink.href = imgSrc;
      downloadLink.download = `cmt-travels-${imgAlt.toLowerCase().replace(/\s+/g, "-")}.jpg`;
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  const closeModal = () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  };

  closeModalBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // --- SWIPER INITIALIZATION ---
  var swiper = new Swiper(".gallery-container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 5,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    breakpoints: {
      768: {
        coverflowEffect: {
          rotate: 10,
          stretch: -20,
          depth: 150,
          modifier: 2,
        },
      },
    },
  });

  document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("show") && e.key === "ArrowRight") swiper.slideNext();
    if (modal.classList.contains("show") && e.key === "ArrowLeft") swiper.slidePrev();
  });

  // --- EMAILJS FORM SUBMISSION ---
  const contactForm = document.getElementById("contact-form");
  const responseMessage = document.getElementById("response-message");
  const submitBtn = document.getElementById("submit-button");

  (function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // IMPORTANT: Replace with your EmailJS Public Key
  })();

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>`;

    const serviceID = "YOUR_SERVICE_ID"; // IMPORTANT: Replace with your EmailJS Service ID
    const templateID = "YOUR_TEMPLATE_ID"; // IMPORTANT: Replace with your EmailJS Template ID

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
        alert(JSON.stringify(err));
      }
    );
  });
});