const customMenuWP = () => {
  const btn = document.querySelector(`.no-click a`);

  btn.addEventListener(`click`, (e) => {
    e.preventDefault();
  });
};

export {customMenuWP};
