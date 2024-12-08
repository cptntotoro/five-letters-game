//Функция отображения результата уровня
export const gameResultShow = (isVisible) => {
  const gameBoard = document.querySelector('.game-board');
  const keyboard = document.querySelector('.keyboard');
  const asideToolbar = document.querySelector('.aside__toolbar');
  const gameResult = document.querySelector('.game-result');

  gameBoard.classList.toggle('hidden', isVisible);
  keyboard.classList.toggle('hidden', isVisible);
  asideToolbar.classList.toggle('hidden', isVisible);
  gameResult.classList.toggle('hidden', !isVisible);
};
