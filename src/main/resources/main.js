import { getWord } from './scripts/api/getWord.js';
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';
import { gameResultShow } from './scripts/game-board/game-result.js';
import { validateInput } from './scripts/game-board/input-validation.js'
import { blockInputRow } from './scripts/game-board/block-input-row.js';
import { toggleCheckButtonState } from './scripts/game-board/toggle-check-button-state.js';
import { getWordFromInputRow } from './scripts/game-board/get-word-from-input-row.js';
import { enableNextRow } from './scripts/game-board/enable-next-row.js';
import { blockButton } from './scripts/game-board/block-button.js';


createBoard();
let currentRowIndex = 0;

const gameBoardInputs = document.querySelectorAll('.game-board__input');
const inputRows = document.querySelectorAll('.game-board__row');
const checkButton = document.querySelector('.keyboard__button-check');
// при инициализации кнопка недоступна
blockButton(checkButton, 'keyboard__button-check-disabled')

// Блокируем все ряды, кроме первого
blockInputRow(inputRows, 1);

// Привязываем обработчики событий к инпутам каждого ряда
inputRows.forEach((row, rowIndex) => {
  const rowInputs = row.querySelectorAll('.game-board__input');

  // Привязываем обработчик события на ввод для каждого ряда
  rowInputs.forEach(input => {
    input.addEventListener('input', () => {
      // Проверяем, все ли инпуты в текущем ряду заполнены
      toggleCheckButtonState(rowInputs, checkButton);
    });
  });

  // Если это не первый ряд, то изначально блокируем инпуты
  if (rowIndex > 0) {
    blockInputRow(inputRows, rowIndex);
  }
});

const colorizeLetters = (word, correctWord) => {
  const correct = [];
  const misplaced = [];
  const absent = [];

  const correctWordArr = correctWord.split('');
  const wordArr = word.split('');

  wordArr.forEach((letter, index) => {
    if (letter === correctWordArr[index]) {
      correct.push(letter);
      correctWordArr[index] = null;
    } else if (correctWordArr.includes(letter)) {
      misplaced.push(letter);
      correctWordArr[correctWordArr.indexOf(letter)] = null;
    } else {
      absent.push(letter);
    }
  });

  return { correct, misplaced, absent };
};

const updateUIWithColors = (rowIndex, correct, misplaced, absent) => {
  const inputs = inputRows[rowIndex].querySelectorAll('.game-board__input');
  Array.from(inputs).forEach((input, index) => {
    if (correct.includes(input.value)) {
      input.classList.add('correct'); // Зелёный
    } else if (misplaced.includes(input.value)) {
      input.classList.add('misplaced'); // Жёлтый
    } else {
      input.classList.add('absent'); // Серый
    }
  });
};

checkButton.addEventListener('click', () => {
  blockButton(checkButton, 'keyboard__button-check-disabled');

  const word = getWordFromInputRow(inputRows[currentRowIndex - 1]);
  const correctWord = "фирма";

  const { correct, misplaced, absent } = colorizeLetters(word, correctWord);

  updateUIWithColors(currentRowIndex - 1, correct, misplaced, absent);

  if (word === correctWord) {
    gameResultShow(true);
    return;
  }

  // blockInputRow(inputRows, currentRowIndex);
  enableNextRow(inputRows, currentRowIndex);
  currentRowIndex++;

  console.log(currentRowIndex, inputRows.length);
  if (currentRowIndex === inputRows.length) {
    gameResultShow(false);
  }
});

validateInput(gameBoardInputs);

const logWord = async () => {
  const data = await getWord();
  if (data) {
    console.log(data.word);
  }
};

logWord();
