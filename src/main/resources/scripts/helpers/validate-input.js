// Функция валидации инпутов
const regex = /[^А-Яа-я]$/;

export const validateInput = (inputs, checkRowCompletionFunc) => {
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const value = event.target.value;

      if (regex.test(value)) {
        event.target.value = '';
      }
      checkRowCompletionFunc(inputs);
    });
  });
};