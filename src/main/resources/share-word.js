// helpers
import { getLinkHiddenWord } from "./scripts/api/get-link-hidden-word.js";
import { checkInputRowHiddenWordCompletion } from "./scripts/helpers/check-input-row-hidden-word-completion.js";
import { copyToClipboard } from "./scripts/helpers/copy-to-clipboard.js";
import { getHiddenWordFromInputs } from "./scripts/helpers/get-hidden-word-from-inputs.js";
import { validateInput } from "./scripts/helpers/validate-input.js";

// Переменная для хранения активного инпута
let activeInputIndex = 0;

export const linkButton = document.querySelector('.aside__toolbar-button-link');
const inputs = document.querySelectorAll('.game-board__input');
// кнопка виртуальной клавиатуры
const keyboardButtons = document.querySelectorAll('.keyboard__button');

// Функция для установки фокуса на активный инпут
function setActiveInput(index) {
  if (index >= 0 && index < inputs.length) {
      activeInputIndex = index;
      inputs[activeInputIndex].focus();
  }
}

// Функция проверки заполненности всех полей
const checkAllInputsFilled = () => {
  const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');

  if (allFilled) {
    linkButton.classList.remove('aside__toolbar-button-link-disabled');
    linkButton.classList.add('aside__toolbar-button-link-enabled');
  } else {
    linkButton.classList.add('aside__toolbar-button-link-disabled');
    linkButton.classList.remove('aside__toolbar-button-link-enabled');
  }
};

// Устанавливаем обработчики для кнопок виртуальной клавиатуры
keyboardButtons.forEach(button => {
  button.addEventListener('click', () => {
      const key = button.textContent.trim(); // Текст кнопки

      if (key) {
          // Если есть активный инпут, добавляем в него текст
          const currentInput = inputs[activeInputIndex];
          if (currentInput && !currentInput.disabled) {
              currentInput.value = key;

              // Проверка заполненности всех инпутов
              checkAllInputsFilled();

              // Переходим к следующему инпуту
              setActiveInput(activeInputIndex + 1);
          }
      } else if (button.classList.contains('keyboard__button-delete')) {
          // Удаление символа
          const currentInput = inputs[activeInputIndex];
          if (currentInput && !currentInput.disabled) {
              currentInput.value = '';

              // Проверка заполненности всех инпутов
              checkAllInputsFilled();
          } else if (activeInputIndex > 0) {
              setActiveInput(activeInputIndex - 1);
              inputs[activeInputIndex].value = '';

              // Проверка заполненности всех инпутов
              checkAllInputsFilled();
          }
      }
  });
});

// Инициализация
setActiveInput(0);
inputs.forEach((input, index) => input.addEventListener('focus', () => activeInputIndex = index));

// Обработчик кнопки ссылки
const copyLinkHiddenWord = async () => {
  const hiddenWord = getHiddenWordFromInputs(inputs);
  const data = await getLinkHiddenWord(hiddenWord);
  await copyToClipboard(data.link);
};

linkButton.addEventListener('click', copyLinkHiddenWord);
validateInput(inputs, checkAllInputsFilled);
// Проверка всех полей при загрузке
checkAllInputsFilled();
