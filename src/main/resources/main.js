// api
import { getLinkHiddenWord } from './scripts/api/get-link-hidden-word.js';
import { getWord } from './scripts/api/getWord.js';
// gameBoard
import { createBoard } from './scripts/game-board/create-board.js';
import { renderLoading } from './scripts/game-board/loader.js';
import { gameResultShow } from './scripts/game-board/game-result.js';
import { validateInput } from './scripts/game-board/input-validation.js'
import { getHiddenWordFromInputs } from './scripts/game-board/getHiddenWordFromInputs.js';
import { copyLinkToClipboard } from './scripts/game-board/copy-link-to-clipboard.js';

createBoard();

const gameBoardInputs = document.querySelectorAll('.game-board__input');
const shareLinkButton = document.querySelector('.aside__toolbar-button-link');

validateInput(gameBoardInputs);

const logWord = async () => {
  const data = await getWord();
  if (data) {
    console.log(data.word);
  }
};

logWord();

shareLinkButton.addEventListener('click', async () => {
 const hiddenWord = getHiddenWordFromInputs(gameBoardInputs);
 const linkHiddenWord = await getLinkHiddenWord(hiddenWord);
 if (linkHiddenWord) {
   copyLinkToClipboard(linkHiddenWord);
 }
});

