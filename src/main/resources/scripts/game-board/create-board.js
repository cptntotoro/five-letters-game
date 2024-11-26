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
      cell.classList.add('game-board__cell');
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }
};


