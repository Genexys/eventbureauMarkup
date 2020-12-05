const mainEventsSlider = () => {
  const sliderEvents = new Swiper(`.main-last-events__slider`, {
    loop: true,
    slidesPerView: 1,

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 30,
      },

      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

      1024: {
        slidesPerView: 3,
        spaceBetween: 170,
      },

      1400: {
        slidesPerView: 3,
        spaceBetween: 270,
      }
    },

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

export {mainEventsSlider};
