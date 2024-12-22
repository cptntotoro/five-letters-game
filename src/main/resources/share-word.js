// helpers
import { getLinkHiddenWord } from "./scripts/api/get-link-hidden-word.js";
import { checkInputRowHiddenWordCompletion } from "./scripts/helpers/check-input-row-hidden-word-completion.js";
import { copyToClipboard } from "./scripts/helpers/copy-to-clipboard.js";
import { getHiddenWordFromInputs } from "./scripts/helpers/get-hidden-word-from-inputs.js";
import { validateInput } from "./scripts/helpers/validate-input.js";

export const linkButton = document.querySelector('.aside__toolbar-button-link');
const inputs = document.querySelectorAll('.game-board__input');

linkButton.classList.add('aside__toolbar-button-link-disabled');
validateInput(inputs, checkInputRowHiddenWordCompletion);

const copyLinkHiddenWord = async () => {
  const hiddenWord = getHiddenWordFromInputs(inputs);
  const data = await getLinkHiddenWord(hiddenWord);
  await copyToClipboard(data.link);
}

linkButton.addEventListener('click', copyLinkHiddenWord);