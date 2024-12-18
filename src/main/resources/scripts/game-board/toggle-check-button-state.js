export const toggleCheckButtonState = (inputs, checkButton) => {
  const isRowComplete = Array.from(inputs).every(input => input.value.trim() !== '');

  if (isRowComplete) {
    checkButton.classList.remove('keyboard__button-check-disabled');
    checkButton.classList.add('keyboard__button-check-enabled');
  } else {
    checkButton.classList.remove('keyboard__button-check-enabled');
    checkButton.classList.add('keyboard__button-check-disabled');
  }
};
