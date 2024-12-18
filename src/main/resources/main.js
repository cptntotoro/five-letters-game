import { getWord } from './scripts/api/getWord.js';
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';
import { gameResultShow } from './scripts/game-board/game-result.js';
import { validateInput } from './scripts/game-board/input-validation.js'
import { blockInputRows } from './scripts/game-board/block-input-row.js';
import { toggleCheckButtonState } from './scripts/game-board/toggle-check-button-state.js';
import { getWordFromInputRow } from './scripts/game-board/get-word-from-input-row.js';
import { enableNextRow } from './scripts/game-board/enable-next-row.js';

createBoard();
let currentRowIndex = 0;

const gameBoardInputs = document.querySelectorAll('.game-board__input');
const inputRows = document.querySelectorAll('.game-board__row');
const checkButton = document.querySelector('.keyboard__button-check');
// при инициализации кнопка недоступна
checkButton.classList.add('keyboard__button-check-disabled')

gameResultShow(false);

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
    blockInputRows(inputRows, rowIndex);
  }
});

checkButton.addEventListener('click', () => {
  checkButton.classList.add('keyboard__button-check-disabled')

  const word = getWordFromInputRow(inputRows[currentRowIndex]);
  const correctWord = "фирма";

  if (word === correctWord) {
    gameResultShow(true, true);
    return;
  }

  console.log({
    currentRowIndex,
    inputRowsLength: inputRows.length - 1
  })

  if (currentRowIndex === inputRows.length - 1) {
    gameResultShow(true, false); // Показываем экран проигрыша
    console.log('проебал');
    return;
  }

  currentRowIndex++;
  enableNextRow(inputRows, currentRowIndex);
});

validateInput(gameBoardInputs);

const logWord = async () => {
  const data = await getWord();
  if (data) {
    console.log(data.word);
  }
};

logWord();
