export const blockInputRow = (inputRows, currentRowIndex) => {
  const currentRowInputs = inputRows[currentRowIndex].querySelectorAll('.game-board__input');
  currentRowInputs.forEach(input => {
    input.setAttribute('disabled', true);
  });
};