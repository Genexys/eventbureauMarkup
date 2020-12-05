const sliderGallery = () => {
  const gallerySlider = new Swiper(`.gallery-event__slider`, {
    slidesPerView: 5,
    spaceBetween: 30,

    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      520: {
        slidesPerView: 2,
      },

      768: {
        slidesPerView: 3,
      },

      1024: {
        slidesPerView: 4,
      },

      1400: {
        slidesPerView: 5,
      }
    },

    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`,
    },

    on: {
      init: function () {
        if (this.slides.length < 5 && window.innerWidth > 520) {
          document.querySelectorAll(`.gallery-event__btn`)[0].classList.add(`hidden`);
          document.querySelectorAll(`.gallery-event__btn`)[1].classList.add(`hidden`);
        }
      },
    },
  });
};

export {sliderGallery};
