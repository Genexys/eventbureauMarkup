import {mainSlider} from "./modules/mainSlider";
import {mainEventsSlider} from "./modules/mainEventsSlider";
import {sliderGallery} from "./modules/sliderGallery";
import {mainFormValidate} from "./modules/mainFormValidate";
import {customMenuWP} from "./modules/customMenuWP";
import {getCallback} from "./modules/getCallback";
import {phoneMask} from "./modules/phoneMask";

// Utils
// ---------------------------------


// Modules
// ---------------------------------
mainSlider();
mainEventsSlider();
sliderGallery();
mainFormValidate();
customMenuWP();
getCallback();
phoneMask();

const ie11Download = (el) => {
  if (el.href === ``) {
    throw Error(`The element has no href value.`);
  }

  let filename = el.getAttribute(`download`);
  if (filename === null || filename === ``) {
    const tmp = el.href.split(`/`);
    filename = tmp[tmp.length - 1];
  }

  el.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.onloadstart = () => {
      xhr.responseType = `blob`;
    };
    xhr.onload = () => {
      navigator.msSaveOrOpenBlob(xhr.response, filename);
    };
    xhr.open(`GET`, el.href, true);
    xhr.send();
  });
};

const downloadLinks = document.querySelectorAll(`a[download]`);

const initIe11Download = () => {
  if (window.navigator.msSaveBlob) {
    if (downloadLinks.length) {
      downloadLinks.forEach((el) => {
        ie11Download(el);
      });
    }
  }
};

export {initIe11Download};

const forEachPolyfill = () => {
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
};

export {forEachPolyfill};

const body = document.querySelector(`body`);

const getScrollbarWidth = () => {
  const outer = document.createElement(`div`);
  outer.style.visibility = `hidden`;
  outer.style.overflow = `scroll`;
  outer.style.msOverflowStyle = `scrollbar`;
  body.appendChild(outer);
  const inner = document.createElement(`div`);
  outer.appendChild(inner);
  const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};

const getBodyScrollTop = () => {
  return (
    self.pageYOffset ||
    (document.documentElement && document.documentElement.ScrollTop) ||
    (body && body.scrollTop)
  );
};

const disableScrolling = () => {
  const scrollWidth = getScrollbarWidth();
  body.setAttribute(`style`, `padding-right: ` + scrollWidth + `px;`);
  body.dataset.scrollY = `${getBodyScrollTop()}`;
  body.style.top = `-${body.dataset.scrollY}px`;
  body.classList.add(`scroll-lock`);
};

const enableScrolling = () =>{
  body.removeAttribute(`style`);
  body.classList.remove(`scroll-lock`);
  window.scrollTo(0, +body.dataset.scrollY);
};

export {enableScrolling, disableScrolling};

const customMenuWP = () => {
  const btn = document.querySelector(`.no-click a`);

  btn.addEventListener(`click`, (e) => {
    e.preventDefault();
  });
};

export {customMenuWP};

const getCallback = () => {
  const btns = document.querySelectorAll(`.btn-call`);
  const form = document.querySelector(`.main-form__form`);
  const formTop = form.getBoundingClientRect().top + window.scrollY - 300;

  for (const btn of btns) {
    btn.addEventListener(`click`, () => {
      window.scroll({
        top: formTop,
        behavior: `smooth`
      });
    });
  }
};

export {getCallback};

import MicroModal from 'micromodal';
import validate from '../vendor/validate.min';

export const validateForm = function (form, config, closeModal = false) {
  if (form) {
    form.addEventListener(`submit`, function (e) {
      e.preventDefault();
      handleFormSubmit(form);
    });

    const inputs = form.querySelectorAll(`input, textarea, select`);

    for (let i = 0; i < inputs.length; ++i) {

      inputs.item(i).addEventListener(`change`, function (ev) {
        let errors = validate(form, config) || {};
        showErrorsForInput(this, errors[this.name]);
      });

      inputs.item(i).addEventListener(`focus`, function () {
        this.parentNode.classList.remove(`input-wrapper--error`);
        this.parentNode.classList.remove(`input-wrapper--success`);
      });
    }

    function handleFormSubmit(form, input) {
      let errors = validate(form, config);
      showErrors(form, errors || {});
      if (!errors) {
        showSuccess();
      }
    }

    function showErrors(form, errors) {
      form.querySelectorAll(`input[name], select[name]`).forEach(function (input) {
        showErrorsForInput(input, errors && errors[input.name]);
      });
    }

    function showErrorsForInput(input, errors) {

      let formGroup = closestParent(input.parentElement, `input-wrapper`);

      resetFormGroup(formGroup);

      if (errors) {
        formGroup.classList.add(`input-wrapper--error`);
      } else {
        formGroup.classList.add(`input-wrapper--success`);
      }
    }

    function closestParent(child, className) {
      if (!child || child === document) {
        return null;
      }
      if (child.classList.contains(className)) {
        return child;
      } else {
        return closestParent(child.parentNode, className);
      }
    }

    function resetFormGroup(formGroup) {
      formGroup.classList.remove(`input-wrapper--error`);
      formGroup.classList.remove(`input-wrapper--success`);
    }

    function showSuccess() {
      const formData = new FormData(form);
      const searchParams = new URLSearchParams();

      for (const pair of formData) {
        searchParams.append(pair[0], pair[1]);
      }

      // fetch(form.getAttribute(`action`), {
      //   method: form.getAttribute(`method`),
      //   body: searchParams,
      // })
      //   .then((response) => {
      //     return response.text();
      //   })
      //   .then((response) => {
      //     return response;
      //   })
      //   .then(() => {
      //     form.reset();
      //
      //     MicroModal.show(`tnx-modal`);
      //
      //     setTimeout(() => {
      //       MicroModal.close(`tnx-modal`);
      //     }, 2000);
      //
      //   }).catch(error => {
      //   console.error(error);
      // });

    }
  }
};

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

import {validateForm} from "./getValidate";

const mainFormValidate = () => {
  const form = document.querySelector(`.main-form__form`);

  const constraints = {
    name: {
      presence: true,
    },
    phone: {
      presence: true,
      format: {
        pattern: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/
      }
    },

  };

  // validateForm(form, constraints);

};

export {mainFormValidate};

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

import Inputmask from "inputmask";

const phoneMask = () => {

  Inputmask({
    mask: "+7(999)999-99-99",
    showMaskOnHover: false,
  }).mask(document.querySelectorAll(`input[type="tel"]`));

};

export {phoneMask};

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
