document.addEventListener("DOMContentLoaded", () => {
  let swiperOurClients;
  const clientsSwiperContainer = document.querySelector('.home-clients-slider');

  if (clientsSwiperContainer) {
    swiperOurClients = new Swiper(clientsSwiperContainer, {
      loop: true,
      slidesPerView: "auto",
      freeMode: true,
      // centeredSlides: true,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
      },
      observer: true,
      observeParents: true,
    });
  }

  if (swiperOurClients) {
    swiperOurClients.update();
  }
});
