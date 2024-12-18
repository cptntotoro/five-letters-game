export const enableNextRow = (inputRows, currentRowIndex) => {
  if (currentRowIndex <= inputRows.length) {
    const nextRowInputs = inputRows[currentRowIndex].querySelectorAll('.game-board__input');
    nextRowInputs.forEach(input => {
      input.removeAttribute('disabled');
    });
  }
};
