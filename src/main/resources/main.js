import { getWord } from './scripts/api/getWord.js';
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';
import { gameResultShow } from './scripts/game-board/game-result.js';
import { validateInput } from './scripts/game-board/input-validation.js'

createBoard();

const gameBoardInputs = document.querySelectorAll('.game-board__input');

validateInput(gameBoardInputs);

const logWord = async () => {
  const data = await getWord();
  if (data) {
    console.log(data.word);
  }
};
logWord();

