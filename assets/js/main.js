document.addEventListener("DOMContentLoaded", () => {
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

  mobileSidebarOpenBtn?.addEventListener('click', () => {
    mobileSidebarOpenBtn.classList.add('is-open');
    navbarOverlayBg.classList.add('is-open');
    navbarMenuParent.classList.add('is-open');
  });

  mobileSidebarCloseBtn?.addEventListener('click', () => {
    mobileSidebarOpenBtn.classList.remove('is-open');
    navbarOverlayBg.classList.remove('is-open');
    navbarMenuParent.classList.remove('is-open');
  });

  navbarOverlayBg?.addEventListener('click', () => {
    mobileSidebarOpenBtn.classList.remove('is-open');
    navbarOverlayBg.classList.remove('is-open');
    navbarMenuParent.classList.remove('is-open');
  });

  // SWIPER SLIDERS
  document.querySelectorAll('.atech-menu-item').forEach(item => {
    const submenu = item.querySelector('.atech-menu-submenu');

    if (submenu) {
      item.addEventListener('mouseenter', () => {
        submenu.style.display = 'block';
        submenu.style.opacity = '1';
        submenu.style.visibility = 'visible';
      });

      item.addEventListener('mouseleave', () => {
        submenu.style.display = 'none';
        submenu.style.opacity = '0';
        submenu.style.visibility = 'hidden';
      });
    }
  });


  /* ####### TRANSITION & ANIMATION STOPPER ON RESIZE ####### */
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resize-animation-stopper");
    }, 400);
  });
  /* ####### EOF TRANSITION & ANIMATION STOPPER ON RESIZE ####### */

  // const menuLinks = document.querySelectorAll('.atech-menu-link');

  // menuLinks.forEach(link => {
  //   const submenuClass = link.getAttribute('data-submenu');
  //   const submenu = document.querySelector(`.${submenuClass}`);

  //   if (submenu) {
  //     let timeout;

  //     link.addEventListener('mouseenter', () => {
  //       clearTimeout(timeout);
  //       submenu.style.opacity = '1';
  //       submenu.style.visibility = 'visible';
  //     });

  //     // Start hide timer when leaving link
  //     link.addEventListener('mouseleave', () => {
  //       timeout = setTimeout(() => {
  //         submenu.style.opacity = '0';
  //         submenu.style.visibility = 'hidden';
  //       }, 200);
  //     });

  //     // Keep submenu open when hovered
  //     submenu.addEventListener('mouseenter', () => {
  //       clearTimeout(timeout);
  //       submenu.style.opacity = '1';
  //       submenu.style.visibility = 'visible';
  //     });

  //     // Hide submenu when leaving
  //     submenu.addEventListener('mouseleave', () => {
  //       timeout = setTimeout(() => {
  //         submenu.style.opacity = '0';
  //         submenu.style.visibility = 'hidden';
  //       }, 200);
  //     });
  //   }
  // });

  // (() => {
  //   const BREAKPOINT = 1200; // desktop >= 768
  //   const menuLinks = document.querySelectorAll('.atech-menu-link');
  //   const submenus = document.querySelectorAll('.atech-menu-submenu');
  //   const parents = document.querySelectorAll('.atech-menu-parent-inner');

  //   // Mode detection
  //   const isDesktop = () =>
  //     window.matchMedia(`(min-width: ${BREAKPOINT}px) and (hover: hover) and (pointer: fine)`).matches;
  //   const isMobile = () => !isDesktop();

  //   let currentMode = isDesktop() ? 'desktop' : 'mobile';

  //   // ---- Desktop HOVER ----
  //   menuLinks.forEach(link => {
  //     const submenuClass = link.getAttribute('data-submenu');
  //     const submenu = document.querySelector(`.${submenuClass}`);
  //     if (!submenu) return;

  //     let hideTimer;

  //     link.addEventListener('mouseenter', () => {
  //       if (!isDesktop()) return;
  //       clearTimeout(hideTimer);
  //       submenu.style.opacity = '1';
  //       submenu.style.visibility = 'visible';
  //     });

  //     link.addEventListener('mouseleave', () => {
  //       if (!isDesktop()) return;
  //       hideTimer = setTimeout(() => {
  //         submenu.style.opacity = '0';
  //         submenu.style.visibility = 'hidden';
  //       }, 200);
  //     });

  //     submenu.addEventListener('mouseenter', () => {
  //       if (!isDesktop()) return;
  //       clearTimeout(hideTimer);
  //       submenu.style.opacity = '1';
  //       submenu.style.visibility = 'visible';
  //     });

  //     submenu.addEventListener('mouseleave', () => {
  //       if (!isDesktop()) return;
  //       hideTimer = setTimeout(() => {
  //         submenu.style.opacity = '0';
  //         submenu.style.visibility = 'hidden';
  //       }, 200);
  //     });

  //     // ---- Mobile CLICK toggle ----
  //     link.addEventListener('click', (e) => {
  //       if (!isMobile()) return;
  //       e.preventDefault();

  //       // The submenu for this link
  //       const submenuClass = link.getAttribute('data-submenu');
  //       const submenu = document.querySelector(`.${submenuClass}`);

  //       // The parent wrapper for this submenu (if exists)
  //       const parentInner = link.closest('.atech-menu-parent-inner');

  //       if (submenu) {
  //         // Close ALL submenus & parent inners first
  //         submenus.forEach(sm => sm.classList.remove('is-open'));
  //         parents.forEach(pi => pi.classList.remove('is-open'));

  //         // Open only the clicked one
  //         submenu.classList.add('is-open');
  //         if (parentInner) {
  //           console.log(parentInner);
  //           parentInner.classList.add('is-open');
  //         }
  //       }
  //     });
  //   });

  //   // Close everything when clicking outside (mobile only)
  //   document.addEventListener('click', (e) => {
  //     if (!isMobile()) return;
  //     const clickedLink = e.target.closest('.atech-menu-link');
  //     const clickedSub = e.target.closest('.atech-submenu');
  //     if (!clickedLink && !clickedSub) {
  //       submenus.forEach(sm => sm.classList.remove('is-open'));
  //       parents.forEach(pi => pi.classList.remove('is-open'));
  //     }
  //   });

  //   // Mode transitions
  //   function enterDesktopMode() {
  //     // Ensure mobile classes are removed
  //     submenus.forEach(sm => sm.classList.remove('is-open'));
  //     parents.forEach(pi => pi.classList.remove('is-open'));
  //   }

  //   function enterMobileMode() {
  //     // Clear inline styles left by desktop
  //     submenus.forEach(sm => {
  //       sm.style.opacity = '';
  //       sm.style.visibility = '';
  //       sm.style.transform = '';
  //     });
  //   }

  //   function onModeMaybeChange() {
  //     const next = isDesktop() ? 'desktop' : 'mobile';
  //     if (next === currentMode) return;
  //     currentMode = next;
  //     if (next === 'desktop') enterDesktopMode();
  //     else enterMobileMode();
  //   }

  //   window.addEventListener('resize', onModeMaybeChange);
  //   window.addEventListener('orientationchange', onModeMaybeChange);

  //   // Initial setup
  //   if (currentMode === 'desktop') enterDesktopMode();
  //   else enterMobileMode();
  // })();

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
          submenu.style.opacity = '1';
          submenu.style.visibility = 'visible';
        });

        link.addEventListener('mouseleave', () => {
          if (!isDesktop()) return;
          hideTimer = setTimeout(() => {
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
          }, 200);
        });

        submenu.addEventListener('mouseenter', () => {
          if (!isDesktop()) return;
          clearTimeout(hideTimer);
          submenu.style.opacity = '1';
          submenu.style.visibility = 'visible';
        });

        submenu.addEventListener('mouseleave', () => {
          if (!isDesktop()) return;
          hideTimer = setTimeout(() => {
            submenu.style.opacity = '0';
            submenu.style.visibility = 'hidden';
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
        sm.style.opacity = '';
        sm.style.visibility = '';
        sm.style.transform = '';
      });
    }

    function onModeMaybeChange() {
      const next = isDesktop() ? 'desktop' : 'mobile';
      if (next === currentMode) return;
      currentMode = next;
      if (next === 'desktop') enterDesktopMode();
      else enterMobileMode();
    }

    window.addEventListener('resize', onModeMaybeChange);
    window.addEventListener('orientationchange', onModeMaybeChange);

    // initial
    if (currentMode === 'desktop') enterDesktopMode();
    else enterMobileMode();
  })();


  // Initialize client logo slider
  if (clientsSwiperContainer) {
    const clientSwiper = new Swiper(clientsSwiperContainer, {
      loop: true,
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
    });

    clientSwiper.update(); // optional unless dynamic changes happen
  }

  // Initialize each review slider
  clientsReviewsSwiperContainers.forEach((container) => {
    new Swiper(container, {
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
      pagination: {
        el: container.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  });

  // Initialize finest works slider
  if (finestWorksSwiperContainer) {
    new Swiper(finestWorksSwiperContainer, {
      loop: true,
      slidesPerView: "auto",
      freeMode: true,
      spaceBetween: 0,
      allowTouchMove: false,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      pagination: {
        el: finestWorksSwiperContainer.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  }

  // Initialize screenshots buttons slider
  if (screenshotsBtnsSwiperContainer) {
    new Swiper(screenshotsBtnsSwiperContainer, {
      loop: true,
      slidesPerView: 6,
      spaceBetween: 20,
      allowTouchMove: false,
      navigation: {
        nextEl: screenshotsBtnsSwiperContainerWrapper.querySelector(".swiper-button-next"),
        prevEl: screenshotsBtnsSwiperContainerWrapper.querySelector(".swiper-button-prev"),
      },
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
          spaceBetween: 15,
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
  }

  // Initialize screenshots product slider
  if (screenshotsProductSwiperContainer) {
    new Swiper(screenshotsProductSwiperContainer, {
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
        nextEl: screenshotsProductSwiperContainer.querySelector(".swiper-button-next"),
        prevEl: screenshotsProductSwiperContainer.querySelector(".swiper-button-prev"),
      },
    });
  }

  if (projectsBtnsSwiperContainer) {
    new Swiper(projectsBtnsSwiperContainer, {
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      navigation: {
        nextEl: projectsBtnsSwiperContainerWrapper.querySelector(".swiper-button-next"),
        prevEl: projectsBtnsSwiperContainerWrapper.querySelector(".swiper-button-prev"),
      },
      observer: true,
      observeParents: true,
    });
  }


  if (appscreensSwiperContainer) {
    new Swiper(appscreensSwiperContainer, {
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
      pagination: {
        el: appscreensSwiperContainer.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  }

  if (servicesDetailsTwoSwiperContainer) {
    new Swiper(servicesDetailsTwoSwiperContainer, {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      observer: true,
      observeParents: true,
      pagination: {
        el: servicesDetailsTwoSwiperContainer.querySelector(".swiper-pagination"),
        clickable: true,
      },
    });
  }
});


