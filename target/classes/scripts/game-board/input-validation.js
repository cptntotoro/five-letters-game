const regex = /[^А-Яа-яЁё]$/;

export const validateInput = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const value = event.target.value;

      if (regex.test(value)) {
        event.target.value = '';
      }
    })
  })
};
