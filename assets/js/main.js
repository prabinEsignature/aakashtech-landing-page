document.addEventListener("DOMContentLoaded", () => {
  const clientsSwiperContainer = document.querySelector('.home-clients-slider');
  const clientsReviewsSwiperContainers = document.querySelectorAll('.tab-pane-slider');
  const finestWorksSwiperContainer = document.querySelector('.finest-works-slider');
  const screenshotsBtnsSwiperContainer = document.querySelector('.screenshots-btns-slider');
  const screenshotsBtnsSwiperContainerWrapper = document.querySelector('.screenshots-btns-slider-wrapper');
  const screenshotsProductSwiperContainer = document.querySelector('.screenshots-product-slider');

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
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
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

    screenshotsProductSwiperContainer.slideTo(1, false, false);
  }
});




<script>
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
</script>
