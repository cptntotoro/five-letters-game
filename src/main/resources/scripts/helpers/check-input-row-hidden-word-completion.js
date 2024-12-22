import { linkButton } from "../../share-word.js";

export const checkInputRowHiddenWordCompletion = (inputs) => {
  const isRowComplete = Array.from(inputs).every(input => input.value.trim() !== '');
  if (isRowComplete) {
    linkButton.classList.remove('aside__toolbar-button-link-disabled');
    linkButton.classList.add('aside__toolbar-button-link-enabled');
  } else {
    linkButton.classList.add('aside__toolbar-button-link-disabled');
    linkButton.classList.remove('aside__toolbar-button-link-enabled');
  }
};