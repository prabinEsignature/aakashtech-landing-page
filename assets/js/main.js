document.addEventListener("DOMContentLoaded", () => {
  const clientsSwiperContainer = document.querySelector('.home-clients-slider');
  const clientsReviewsSwiperContainers = document.querySelectorAll('.tab-pane-slider');

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
});
