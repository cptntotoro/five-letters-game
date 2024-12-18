export const enableNextRow = (inputRows, currentRowIndex) => {
  console.log('сработала функция открытия следующего ряда');

  console.log({
    inputRows,
    currentRowIndex
  });

  if (currentRowIndex + 1 <= inputRows.length) {
    const nextRowInputs = inputRows[currentRowIndex].querySelectorAll('.game-board__input');
    nextRowInputs.forEach(input => {
      input.removeAttribute('disabled');
    });
  }
};
