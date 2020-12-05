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
