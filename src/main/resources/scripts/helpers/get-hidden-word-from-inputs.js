export const getHiddenWordFromInputs = (inputs) => {
  let word = '';
  inputs.forEach((input) => word += input.value)
  return word;
}