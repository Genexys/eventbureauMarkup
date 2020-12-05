const mainSlider = () => {
  const slider = new Swiper(`.main-slider__container`, {
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};

export {mainSlider};
