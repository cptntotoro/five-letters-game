export const validateInput = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const value = event.target.value;
      const newValue = value.replace(/[^А-Яа-яЁё]$/, '');

      if (value !== newValue) {
        event.target.value = newValue;
      }
    })
  })
};


