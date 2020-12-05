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
