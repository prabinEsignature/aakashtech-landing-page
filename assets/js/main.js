// Prevent browser from restoring scroll position until layout stabilizes
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Helper: safely init Swiper only when container is visible
function initSwiperWhenVisible(container, options) {
  if (!container) return;
  const observer = new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        new Swiper(container, options);
        obs.disconnect(); // init only once
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(container);
}

// Helper: safely get Swiper child element
function safeSwiperEl(parent, selector) {
  if (!parent) return undefined;
  const el = parent.querySelector(selector);
  return el || undefined;
}

window.addEventListener("load", () => {
  const clientsSwiperContainer = document.querySelector('.home-clients-slider');
  const clientsReviewsSwiperContainers = document.querySelectorAll('.tab-pane-slider');
  const finestWorksSwiperContainer = document.querySelector('.finest-works-slider');
  const screenshotsBtnsSwiperContainer = document.querySelector('.screenshots-btns-slider');
  const screenshotsBtnsSwiperContainerWrapper = document.querySelector('.screenshots-btns-slider-wrapper');
  const screenshotsProductSwiperContainer = document.querySelector('.screenshots-product-slider');
  const projectsBtnsSwiperContainer = document.querySelector('.projects-btns-slider');
  const projectsBtnsSwiperContainerWrapper = document.querySelector('.projects-btns-slider-wrapper');
  const appscreensSwiperContainer = document.querySelector('.appscreens-slider');
  const servicesDetailsTwoSwiperContainer = document.querySelector('.services-details-two-slider');

  const mobileSidebarOpenBtn = document.getElementById("mobileSidebarOpenBtn");
  const mobileSidebarCloseBtn = document.getElementById("mobileSidebarCloseBtn");
  const navbarOverlayBg = document.querySelector(".atech-navbar-overlay-bg");
  const navbarMenuParent = document.querySelector(".atech-menu-parent");
  const pageBody = document.querySelector("body");

  /* ===== SIDEBAR OPEN ===== */
  mobileSidebarOpenBtn?.addEventListener("click", () => {
    mobileSidebarOpenBtn.classList.add("is-open");
    pageBody.classList.add("custom-fixed-util");
    gsap.set(navbarMenuParent, { display: "block" });

    gsap.fromTo(navbarOverlayBg,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.2 }
    );

    gsap.fromTo(navbarMenuParent,
      { x: "100%" },
      { x: "0%", duration: 0.3, ease: "power3.out" }
    );
  });

  /* ===== SIDEBAR CLOSE ===== */
  const closeSidebar = () => {
    mobileSidebarOpenBtn?.classList.remove("is-open");
    pageBody.classList.remove("custom-fixed-util");

    gsap.to(navbarOverlayBg, { autoAlpha: 0, duration: 0.1 });
    gsap.to(navbarMenuParent, {
      x: "100%",
      duration: 0.2,
      ease: "power3.in",
      onComplete: () => gsap.set(navbarMenuParent, { display: "none" }),
    });
  };

  mobileSidebarCloseBtn?.addEventListener("click", closeSidebar);
  navbarOverlayBg?.addEventListener("click", closeSidebar);

  /* ===== SUBMENU HOVER/TOGGLE ===== */
  document.querySelectorAll('.atech-menu-item').forEach(item => {
    const submenu = item.querySelector('.atech-menu-submenu');
    if (!submenu) return;

    item.addEventListener('mouseenter', () => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        submenu.classList.add("submenu-open");
        submenu.classList.remove("submenu-closed");
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        submenu.classList.remove("submenu-open");
        submenu.classList.add("submenu-closed");
      }
    });
  });


  /* ===== RESIZE OPTIMIZATION ===== */
  let resizeTimer;
  let resizeScheduled = false;
  window.addEventListener("resize", () => {
    if (!resizeScheduled) {
      resizeScheduled = true;
      requestAnimationFrame(() => {
        document.body.classList.add("resize-animation-stopper");
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          document.body.classList.remove("resize-animation-stopper");
        }, 400);
        resizeScheduled = false;
      });
    }
  }, { passive: true });


  /* ####### NAVBAR MENU TOGGLE ###### */
  (() => {
    const BREAKPOINT = 1200;
    const menuLinks = document.querySelectorAll('.atech-menu-link'); // top-level anchors
    const submenus = document.querySelectorAll('.atech-menu-submenu');
    const parents = document.querySelectorAll('.atech-menu-parent-inner');

    const isDesktop = () =>
      window.matchMedia(`(min-width: ${BREAKPOINT}px) and (hover: hover) and (pointer: fine)`).matches;
    const isMobile = () => !isDesktop();

    let currentMode = isDesktop() ? 'desktop' : 'mobile';

    // --- per-link wiring ---
    menuLinks.forEach(link => {
      const submenuClass = link.getAttribute('data-submenu');
      const hasSubmenu = !!submenuClass;
      const submenu = hasSubmenu ? document.querySelector(`.${submenuClass}`) : null;

      // ===== DESKTOP: Hover show/hide for items that have a submenu =====
      if (submenu) {
        let hideTimer;

        link.addEventListener('mouseenter', () => {
          if (!isDesktop()) return;
          clearTimeout(hideTimer);
          submenu.classList.add("submenu-open");
          submenu.classList.remove("submenu-closed");
        });

        link.addEventListener('mouseleave', () => {
          if (!isDesktop()) return;
          hideTimer = setTimeout(() => {
            submenu.classList.remove("submenu-open");
            submenu.classList.add("submenu-closed");
          }, 200);
        });

        submenu.addEventListener('mouseenter', () => {
          if (!isDesktop()) return;
          clearTimeout(hideTimer);
          submenu.classList.add("submenu-open");
          submenu.classList.remove("submenu-closed");
        });

        submenu.addEventListener('mouseleave', () => {
          if (!isDesktop()) return;
          hideTimer = setTimeout(() => {
            submenu.classList.remove("submenu-open");
            submenu.classList.add("submenu-closed");
          }, 200);
        });
      }

      // ===== MOBILE: tap top-level link ONLY IF it has a submenu =====
      link.addEventListener('click', (e) => {
        if (!isMobile()) return;         // desktop: let anchors behave normally
        if (!hasSubmenu || !submenu) return; // items without submenu should navigate

        // item has submenu -> open it instead of navigating
        e.preventDefault();
        e.stopPropagation();

        const parentInner = link.closest('.atech-menu-parent-inner');
        const alreadyOpen = submenu.classList.contains('is-open');

        // close all first
        submenus.forEach(sm => sm.classList.remove('is-open'));
        parents.forEach(pi => pi.classList.remove('is-open'));

        // then open if it wasn't open
        if (!alreadyOpen) {
          submenu.classList.add('is-open');
          if (parentInner) parentInner.classList.add('is-open');
        }
      });
    });

    // ===== MOBILE: Back/close inside submenu via .submenu-top =====
    document.querySelectorAll('.atech-menu-submenu .submenu-top').forEach(topBtn => {
      topBtn.addEventListener('click', (e) => {
        if (!isMobile()) return;
        e.preventDefault();
        e.stopPropagation();

        const submenu = topBtn.closest('.atech-menu-submenu');
        const parentInner = topBtn.closest('.atech-menu-parent-inner');

        if (submenu) submenu.classList.remove('is-open');
        if (parentInner) parentInner.classList.remove('is-open');
      });
    });

    // ===== Mode transitions =====
    function enterDesktopMode() {
      // ensure mobile classes are cleared
      submenus.forEach(sm => sm.classList.remove('is-open'));
      parents.forEach(pi => pi.classList.remove('is-open'));
    }

    function enterMobileMode() {
      // clear inline styles from desktop hover logic
      submenus.forEach(sm => {
        sm.classList.remove("submenu-open", "submenu-closed");
      });
    }

    function onModeMaybeChange() {
      const next = isDesktop() ? 'desktop' : 'mobile';
      if (next === currentMode) return;
      currentMode = next;
      if (next === 'desktop') enterDesktopMode();
      else enterMobileMode();
    }

    window.addEventListener('resize', onModeMaybeChange, { passive: true });
    window.addEventListener('orientationchange', onModeMaybeChange, { passive: true });

    // initial
    if (currentMode === 'desktop') enterDesktopMode();
    else enterMobileMode();
  })();


  /* ##### GSAP ANIMATION ##### */
  gsap.registerPlugin(ScrollTrigger, SplitText);

  document.fonts.ready.then(() => {
    // -------------------------------
    // 1Animate Home Banner Title
    // -------------------------------
    const homeBannerEl = document.querySelector(".home-banner-ttl");
    if (homeBannerEl) {
      const homeBannerSplit = new SplitText(homeBannerEl, { type: "words" });
      gsap.timeline().from(homeBannerSplit.words, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "back",
        stagger: 0.1
      });
    }

    // -------------------------------
    // Animate Section Headings
    // -------------------------------
    const sectionHeadingItems = gsap.utils.toArray('.segment-heading-top');
    if (sectionHeadingItems.length > 0) {
      sectionHeadingItems.forEach((el) => {
        gsap.set(el, { y: 60, opacity: 0 });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }

    // --------------------------------------
    // ✨ Reusable Zoom-On-Scroll Animation
    // --------------------------------------
    const applyZoomOnScroll = (selector, options = {}) => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      elements.forEach(el => {
        gsap.fromTo(
          el,
          {
            scale: options.startScale || 1.5,
            opacity: options.startOpacity ?? 0
          },
          {
            scale: options.endScale || 1,
            opacity: options.endOpacity ?? 1,
            duration: options.duration || 1.5,
            ease: options.ease || "power3.out",
            transformOrigin: options.transformOrigin || "center center",
            scrollTrigger: {
              trigger: el,
              start: options.start || "top 80%",
              toggleActions: options.toggleActions || "play none none none",
            }
          }
        );
      });
    };

    applyZoomOnScroll(".zoom-on-scroll");

    // --------------------------------------
    // ✨ Service Item Animation
    // --------------------------------------
    const serviceItems = gsap.utils.toArray('.services-main-item-wrapper');

    serviceItems.forEach((wrapper, index) => {
      const imgDiv = wrapper.querySelector('.services-item-img');
      const infoDiv = wrapper.querySelector('.services-item-info');

      if (imgDiv && infoDiv) {
        const isEven = index % 2 === 1;

        gsap.from(imgDiv, {
          x: isEven ? 100 : -100, // right for even, left for odd
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });

        gsap.from(infoDiv, {
          x: isEven ? -100 : 100, // left for even, right for odd
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });
      }
    });
  });

  // --------------------------------------
  // ✨ Two Columns Grid Animation
  // --------------------------------------
  const animateTwoColumnGrids = (selector, leftClass, rightClass) => {
    const grids = gsap.utils.toArray(selector);

    grids.forEach(grid => {
      const leftBlock = grid.querySelector(leftClass);
      const rightBlock = grid.querySelector(rightClass);

      if (leftBlock && rightBlock) {
        gsap.from(leftBlock, {
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

        gsap.from(rightBlock, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });
  };

  animateTwoColumnGrids(".contact-grid-block", ".contact-block-info", ".contact-block-form");
  animateTwoColumnGrids(".banner-segment-two-grid", ".about-banner-segment-img", ".about-banner-segment-description");
  animateTwoColumnGrids(".about-mvg-grid", ".about-mvg-img-group", ".about-mvg-details");
  animateTwoColumnGrids(".download-showcase-grid", ".download-showcase-info", ".download-showcase-img");

  /* ===== SWIPER INITIALIZATIONS ===== */
  /* ===== Clients Swiper ===== */

  initSwiperWhenVisible(clientsSwiperContainer, {
    loop: true,
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 4,
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
    breakpoints: {
      576: {
        spaceBetween: 12,
      },
      768: {
        spaceBetween: 16,
      },
      1400: {
        spaceBetween: 20,
      }
    },
  });

  /* ===== Clients Reviews (multiple) ===== */

  clientsReviewsSwiperContainers.forEach((container) => {
    initSwiperWhenVisible(container, {
      loop: true,
      spaceBetween: 0,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      centeredSlides: true,
      centeredSlidesBounds: true,
      centerInsufficientSlides: true,
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        }
      },
      observer: true,
      observeParents: true,
      pagination: safeSwiperEl(container, ".swiper-pagination") ? {
        el: safeSwiperEl(container, ".swiper-pagination"),
        clickable: true
      } : undefined,
    });
  });

  /* ===== Finest Works ===== */

  initSwiperWhenVisible(finestWorksSwiperContainer, {
    loop: true,
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 0,
    // allowTouchMove: false,
    centeredSlides: true,
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
    pagination: safeSwiperEl(finestWorksSwiperContainer, ".swiper-pagination") ? {
      el: safeSwiperEl(finestWorksSwiperContainer, ".swiper-pagination"),
      clickable: true
    } : undefined,
  });

  /* ===== Screenshots Buttons ===== */

  initSwiperWhenVisible(screenshotsBtnsSwiperContainer, {
    loop: true,
    slidesPerView: 6,
    spaceBetween: 20,
    allowTouchMove: false,
    navigation: screenshotsBtnsSwiperContainerWrapper ? {
      nextEl: safeSwiperEl(screenshotsBtnsSwiperContainerWrapper, ".swiper-button-next"),
      prevEl: safeSwiperEl(screenshotsBtnsSwiperContainerWrapper, ".swiper-button-prev")
    } : undefined,
    observer: true,
    observeParents: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
        allowTouchMove: true,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 12,
        allowTouchMove: true,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
        allowTouchMove: true,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
        allowTouchMove: false,
      },
      1280: {
        slidesPerView: 6,
        spaceBetween: 20,
        allowTouchMove: false,
      },
    },
  });


  /* ===== Screenshots Product ===== */

  initSwiperWhenVisible(screenshotsProductSwiperContainer, {
    loop: true,
    speed: 1000,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    keyboard: {
      enabled: true
    },
    observer: true,
    observeParents: true,
    navigation: {
      nextEl: safeSwiperEl(screenshotsProductSwiperContainer, ".swiper-button-next"),
      prevEl: safeSwiperEl(screenshotsProductSwiperContainer, ".swiper-button-prev")
    },
  });

  /* ===== Projects Buttons ===== */

  initSwiperWhenVisible(projectsBtnsSwiperContainer, {
    loop: true,
    slidesPerView: "auto",
    allowTouchMove: false,
    navigation: projectsBtnsSwiperContainerWrapper ? {
      nextEl: safeSwiperEl(projectsBtnsSwiperContainerWrapper, ".swiper-button-next"),
      prevEl: safeSwiperEl(projectsBtnsSwiperContainerWrapper, ".swiper-button-prev")
    } : undefined,
    observer: true,
    observeParents: true,
  });

  /* ===== App Screens ===== */

  initSwiperWhenVisible(appscreensSwiperContainer, {
    loop: true,
    speed: 1000,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: false,
    },
    keyboard: {
      enabled: true
    },
    observer: true,
    observeParents: true,
    pagination: safeSwiperEl(appscreensSwiperContainer, ".swiper-pagination") ? {
      el: safeSwiperEl(appscreensSwiperContainer, ".swiper-pagination"),
      clickable: true
    } : undefined,
  });

  /* ===== Services Details Two ===== */

  initSwiperWhenVisible(servicesDetailsTwoSwiperContainer, {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    observer: true,
    observeParents: true,
    pagination: safeSwiperEl(servicesDetailsTwoSwiperContainer, ".swiper-pagination") ? {
      el: safeSwiperEl(servicesDetailsTwoSwiperContainer, ".swiper-pagination"),
      clickable: true
    } : undefined,
  });

});


