// helpers
import { getLinkHiddenWord } from "./scripts/api/getLinkHiddenWord.js";
import { checkInputRowHiddenWordCompletion } from "./scripts/helpers/check-input-row-hidden-word-completion.js";
import { getHiddenWordFromInputs } from "./scripts/helpers/get-hidden-word-from-inputs.js";
import { validateInput } from "./scripts/helpers/validate-input.js";

export const linkButton = document.querySelector('.aside__toolbar-button-link');
const checkButton = document.querySelector('.keyboard__button-check');
const inputs = document.querySelectorAll('.game-board__input');

linkButton.classList.add('aside__toolbar-button-link-disabled');
validateInput(inputs, checkInputRowHiddenWordCompletion);

checkButton.addEventListener('click', async () => {
  const hiddenWord = getHiddenWordFromInputs(inputs);
  const data = await getLinkHiddenWord(hiddenWord);

  console.log(hiddenWord, data.link);
});