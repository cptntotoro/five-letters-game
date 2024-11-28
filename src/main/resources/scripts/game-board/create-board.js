// Размеры игрового поля
const boardSizeY = 6;
const boardSizeX = 5;

const gameBoard = document.querySelector('.game-board');

// Функция отрисовки игрового поля
export const createBoard = () => {
  for (let i = 0; i < boardSizeY; i++) {
    const row = document.createElement('ul');
    row.classList.add('game-board__row');

    for (let j = 0; j < boardSizeX; j++) {
      const cell = document.createElement('li');
      const input = document.createElement('input');

      cell.classList.add('game-board__cell');
      input.classList.add('game-board__input');
      input.setAttribute('maxlength', '1');

      row.appendChild(cell);
      cell.appendChild(input);
    }
    gameBoard.appendChild(row);
  }
};
