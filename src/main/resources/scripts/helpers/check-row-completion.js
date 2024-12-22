import { checkButton } from "../../main.js";
// Функция проверки заполненности строки

export const checkRowCompletion = (inputs) => {
  const isRowComplete = Array.from(inputs).every(input => input.value.trim() !== '');
  if (isRowComplete) {
    checkButton.classList.remove('keyboard__button-check-disabled');
    checkButton.classList.add('keyboard__button-check-enabled');
  } else {
    checkButton.classList.add('keyboard__button-check-disabled');
    checkButton.classList.remove('keyboard__button-check-enabled');
  }
};