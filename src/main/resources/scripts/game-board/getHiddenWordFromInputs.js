export const getHiddenWordFromInputs = (inputs) => {
  let hiddenWord = '';
  inputs.forEach((input) => hiddenWord += input.value);
  return hiddenWord;
}