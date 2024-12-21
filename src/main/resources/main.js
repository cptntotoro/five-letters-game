import { getWord } from './scripts/api/getWord.js';
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';
import { showGameResult } from './scripts/game-board/game-result.js';

// Элементы для отображения ошибок
const hintErrorServer = document.querySelector('.hint-error__server');
// кнопка проверки угаданного слова
const checkButton = document.querySelector('.keyboard__button-check');



// Глобальное состояние приложения
let targetWord = '';
let currentRow = 0;


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

// Функция проверки заполненности строки
const checkRowCompletion = (inputs) => {
  const isRowComplete = Array.from(inputs).every(input => input.value.trim() !== '');
  if (isRowComplete) {
    checkButton.classList.remove('keyboard__button-check-disabled');
    checkButton.classList.add('keyboard__button-check-enabled');
  } else {
    checkButton.classList.add('keyboard__button-check-disabled');
    checkButton.classList.remove('keyboard__button-check-enabled');
  }
};

// Функция валидации инпутов
const regex = /[^А-Яа-яЁё]$/;

const validateInput = (inputs) => {
  inputs.forEach((input) => {
    input.addEventListener('input', (event) => {
      const value = event.target.value;

      if (regex.test(value)) {
        event.target.value = '';
      }

      checkRowCompletion(inputs);
    });
  });
};


// Функция блокировки всех строк, кроме текущей
const lockRows = () => {
  const rows = document.querySelectorAll('.game-board__row');
  rows.forEach((row, index) => {
    const inputs = row.querySelectorAll('.game-board__input');
    inputs.forEach((input) => {
      if (index === currentRow) {
        input.removeAttribute('disabled');
      } else {
        input.setAttribute('disabled', 'true');
      }
    });
    if (index === currentRow) {
      validateInput(Array.from(inputs));
    }
  });
};

// Функция запуска следующего уровня
const startNextLevel = async () => {
  try {
    // renderLoading(true)
    const wordResponse = await getWord();
    // toggleLoader(false);

    if (wordResponse && wordResponse.word) {
      targetWord = wordResponse.word.toLowerCase();

      if (targetWord.length !== 5) {
        throw new Error('Получено слово неправильной длины');
      }

      console.log(`Новое загаданное слово: ${targetWord}`);

      // Сбрасываем состояние и продолжаем игру
      currentRow = 0;
      createBoard();
      lockRows();
    } else {
      throw new Error('Слово не получено от сервера');
    }
  } catch (error) {
    console.error(error.message);
    hintErrorServer.classList.remove('invisible');
  }
};

// Функция обработки клика по кнопке check
const handleCheckButtonClick = () => {
  const currentInputs = document.querySelectorAll(`.game-board__row:nth-child(${currentRow + 1}) .game-board__input`);
  const enteredWord = Array.from(currentInputs).map(input => input.value).join('').toLowerCase();

  console.log(`Введённое слово: ${enteredWord}`);

  // Деактивируем текущую строку и кнопку
  currentInputs.forEach(input => input.setAttribute('disabled', 'true'));
  checkButton.classList.add('keyboard__button-check-disabled');
  checkButton.classList.remove('keyboard__button-check-enabled');

  // Получаем списки букв
  const letterStates = getLetterStates(enteredWord, targetWord);

  // Раскрашиваем ячейки текущей строки
  applyColorsToRow(currentInputs, letterStates);

  // Проверяем результат
  if (enteredWord === targetWord) {
    const rowsRemaining = document.querySelectorAll('.game-board__row').length - (currentRow + 1);
    showGameResult(true, rowsRemaining > 0, startNextLevel);
  } else {
    currentRow++;
    if (currentRow >= document.querySelectorAll('.game-board__row').length) {
      showGameResult(false, false, startNextLevel);
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

  try {
    renderLoading(true);
    // const responseData = await getWord();
    const responseData = {word: 'котёл'};
    renderLoading(false);

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

