// Функция отображения лоадера
export function renderLoading(isLoading) {
  const gameBoard = document.querySelector('.game-board');
  const toolbar = document.querySelector('.aside__toolbar');
  const loader = document.querySelector('.loader__container');

  if (isLoading) {
    loader.classList.add('show');
    gameBoard.classList.add('hidden');
    toolbar.classList.add('hidden');
  } else {
    loader.classList.remove('show');
    gameBoard.classList.remove('hidden');
    toolbar.classList.remove('hidden');
  }
}
