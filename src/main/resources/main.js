// api
import { getWord, allGuessedWordMessage } from './scripts/api/get-word.js';
// gameBoard
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';
import { showGameResult, hideGameResult } from './scripts/game-board/game-result.js';
// helpers
import { validateInput } from './scripts/helpers/validate-input.js';
// import { checkRowCompletion } from './scripts/helpers/check-row-completion.js';
import { getEncryptedWord } from './scripts/helpers/get-encrypted-word.js';
import { getDecryptedWord } from './scripts/api/get-decrypted-word.js';

// Элементы для отображения ошибок
const hintErrorServer = document.querySelector('.hint-error__server');
// кнопка проверки угаданного слова
export const checkButton = document.querySelector('.keyboard__button-check');
// кнопка виртуальной клавиатуры
const keyboardButtons = document.querySelectorAll('.keyboard__button');
// Получаем все инпуты игрового поля
let inputs;

// Переменная для хранения активного инпута
let activeInputIndex = 0;

// Глобальное состояние приложения
let targetWord = '';
let currentRow = 0;

// Функция для установки фокуса на активный инпут
function setActiveInput(index) {
  if (index >= 0 && index < inputs.length) {
      activeInputIndex = index;
      inputs[activeInputIndex].focus();
  }
}

// Проверка заполнения текущей строки
const checkRowCompletion = () => {
  const currentRowInputs = document.querySelectorAll(`.game-board__row:nth-child(${currentRow + 1}) .game-board__input`);
  const allFilled = Array.from(currentRowInputs).every(input => input.value.trim() !== '');

  if (allFilled) {
    // Активация кнопки проверки
    checkButton.classList.remove('keyboard__button-check-disabled');
    checkButton.classList.add('keyboard__button-check-enabled');
  } else {
    // Деактивация кнопки проверки
    checkButton.classList.add('keyboard__button-check-disabled');
    checkButton.classList.remove('keyboard__button-check-enabled');
  }
};

// Устанавливаем обработчики для кнопок клавиатуры
keyboardButtons.forEach(button => {
  button.addEventListener('click', () => {
      const key = button.textContent.trim(); // Текст кнопки

      if (key) {
          // Если есть активный инпут, добавляем в него текст
          const currentInput = inputs[activeInputIndex];
          if (currentInput && !currentInput.disabled) {
              currentInput.value = key;

              // Проверяем заполнение строки
              const currentRowInputs = document.querySelectorAll(`.game-board__row:nth-child(${currentRow + 1}) .game-board__input`);
              const allFilled = Array.from(currentRowInputs).every(input => input.value.trim() !== '');

              if (allFilled) {
                  // Активация кнопки проверки
                  checkButton.classList.remove('keyboard__button-check-disabled');
                  checkButton.classList.add('keyboard__button-check-enabled');
              }

              // Переходим к следующему инпуту
              setActiveInput(activeInputIndex + 1);
          }
      } else if (button.classList.contains('keyboard__button-delete')) {
          // Удаление символа
          const currentInput = inputs[activeInputIndex];
          if (currentInput && !currentInput.disabled) {
              currentInput.value = '';

              // Сброс активации кнопки проверки
              checkButton.classList.add('keyboard__button-check-disabled');
              checkButton.classList.remove('keyboard__button-check-enabled');
          } else if (activeInputIndex > 0) {
              setActiveInput(activeInputIndex - 1);
              inputs[activeInputIndex].value = '';

              // Сброс активации кнопки проверки
              checkButton.classList.add('keyboard__button-check-disabled');
              checkButton.classList.remove('keyboard__button-check-enabled');
          }
      }
  });
});


// Функция получения списков букв
const getLetterStates = (enteredWord, targetWord) => {
  const correctPositions = [];
  const incorrectPositions = [];
  const absentLetters = [];

  enteredWord.split('').forEach((char, index) => {
    if (char === targetWord[index]) {
      correctPositions.push({ char, index });
    } else if (targetWord.includes(char)) {
      incorrectPositions.push({ char, index });
    } else {
      absentLetters.push({ char, index });
    }
  });

  return { correctPositions, incorrectPositions, absentLetters };
};

// Функция раскраски ячеек строки
const applyColorsToRow = (inputs, letterStates) => {
  letterStates.correctPositions.forEach(({ index }) => {
    inputs[index].classList.add('input-correct');
  });

  letterStates.incorrectPositions.forEach(({ index }) => {
    inputs[index].classList.add('input-incorrect');
  });

  letterStates.absentLetters.forEach(({ index }) => {
    inputs[index].classList.add('input-almost');
  });
};

// Функция блокировки всех строк, кроме текущей
const lockRows = () => {
  const rows = document.querySelectorAll('.game-board__row');
  rows.forEach((row, index) => {
    const rowInputs = row.querySelectorAll('.game-board__input');
    rowInputs.forEach(input => {
      if (index === currentRow) {
        input.removeAttribute('disabled');
      } else {
        input.setAttribute('disabled', 'true');
      }
    });

    if (index === currentRow) {
      validateInput(Array.from(rowInputs), checkRowCompletion);
    }
  });

  // Сброс кнопки подтверждения при смене строки
  checkButton.classList.add('keyboard__button-check-disabled');
  checkButton.classList.remove('keyboard__button-check-enabled');
};

// функция очистки цвета с клавиатуры
const clearKeyboardColors = () => {
  keyboardButtons.forEach(button => {
    button.classList.remove('keyboard-correct', 'keyboard-almost', 'keyboard-incorrect');
  });
};

// функция для расскраски кнопок клавиатуры
const colorKeyboardButtons = (letterStates) => {
  // Функция для раскраски кнопки, если она еще не была окрашена
  const updateButtonColor = (char, colorClass) => {
    const button = Array.from(keyboardButtons).find(btn => btn.textContent.trim().toLowerCase() === char);
    if (button && !button.classList.contains('keyboard-correct')) {
      // Если кнопка не была отмечена как correct, добавляем класс
      button.classList.remove('keyboard-almost', 'keyboard-incorrect');
      button.classList.add(colorClass);
    }
  };

  // Раскрашиваем буквы в соответствии с их состоянием
  letterStates.correctPositions.forEach(({ char }) => updateButtonColor(char, 'keyboard-correct'));
  letterStates.incorrectPositions.forEach(({ char }) => updateButtonColor(char, 'keyboard-almost'));
  letterStates.absentLetters.forEach(({ char }) => updateButtonColor(char, 'keyboard-incorrect'));
};


// Функция обработки клика по кнопке check
const handleCheckButtonClick = () => {
  const currentInputs = document.querySelectorAll(`.game-board__row:nth-child(${currentRow + 1}) .game-board__input`);
  const enteredWord = Array.from(currentInputs).map(input => input.value).join('').toLowerCase();

  // Деактивируем текущую строку и кнопку
  currentInputs.forEach(input => input.setAttribute('disabled', 'true'));
  checkButton.classList.add('keyboard__button-check-disabled');
  checkButton.classList.remove('keyboard__button-check-enabled');

  // Получаем списки букв
  const letterStates = getLetterStates(enteredWord, targetWord);

  // Раскрашиваем ячейки текущей строки
  applyColorsToRow(currentInputs, letterStates);

  // Раскрашиваем кнопки клавиатуры
  colorKeyboardButtons(letterStates);

  // Проверяем результат
  if (enteredWord === targetWord) {
    const rowsRemaining = document.querySelectorAll('.game-board__row').length - (currentRow + 1);
    showGameResult(true, rowsRemaining > 0, resetGame);
    currentRow = 0;
  } else {
    currentRow++;
    if (currentRow >= document.querySelectorAll('.game-board__row').length) {
      showGameResult(false, false, resetGame);
    } else {
      lockRows();
    }
  }
};

// Добавляем обработчик на кнопку check
checkButton.addEventListener('click', handleCheckButtonClick);

// Функция инициализации игры
const initializeGame = async () => {
  createBoard();
  inputs = document.querySelectorAll('.game-board__input');
  setActiveInput(0)

  inputs.forEach((input, index) => {
    input.addEventListener('input', checkRowCompletion);
    input.addEventListener('focus', () => {
        activeInputIndex = index;
  });
});

  let responseData = null;

  try {
    renderLoading(true);
    if (window.location.pathname.includes('share')) {
      const encryptedWord = getEncryptedWord();
      responseData = await getDecryptedWord(encryptedWord);
    } else {
      responseData = await getWord();
    }
    renderLoading(false);

    if (responseData === allGuessedWordMessage) return;

    if (responseData && responseData.word) {
      targetWord = responseData.word.toLowerCase();
      checkButton.classList.add('keyboard__button-check-disabled');
      lockRows();
    } else {
      throw new Error('Слово не получено от сервера');
    }
  } catch (error) {
    console.error(error.message);
    hintErrorServer.classList.add('hint-error__container-visible');
  }
};

initializeGame();

function resetGame() {
  // Сброс глобальных переменных
  targetWord = '';
  currentRow = 0;

  // Очистка игрового поля
  document.querySelector('.game-board').innerHTML = '';

  clearKeyboardColors();
  hideGameResult();
  initializeGame();
}