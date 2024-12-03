import { getWord } from './scripts/api/getWord.js';
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';

const logWord = async () => {
  const data = await getWord();
  if (data) {
    console.log(data.word);
  }
};

createBoard();
logWord();
