const gameBoard = document.querySelector('.game-board');

// Размеры игрового поля
const boardSizeY = gameBoard.dataset.rows;
const boardSizeX = gameBoard.dataset.columns;

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
      input.setAttribute('aria-label', `Введите букву`);

      row.appendChild(cell);
      cell.appendChild(input);
    }
    gameBoard.appendChild(row);
  }
};
