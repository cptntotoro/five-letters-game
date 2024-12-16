// Функция отображения лоадера
export function renderLoading(isLoading) {
  const gameBoard = document.querySelector('.game-board');
  const toolbar = document.querySelector('.aside__toolbar');
  const loader = document.querySelector('.loader__container');
  const gameResult = document.querySelector('.game-result');

  loader.classList.toggle('invisible', !isLoading);
  gameBoard.classList.toggle('invisible', isLoading);
  toolbar.classList.toggle('invisible', isLoading);
  gameResult.classList.toggle('invisible', isLoading);
}