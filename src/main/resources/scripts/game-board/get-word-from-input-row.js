export const getWordFromInputRow = (row) => {
  const inputs = row.querySelectorAll('.game-board__input');
  const word = Array.from(inputs)
    .map(input => input.value.trim())
    .join('');

  return word;
};