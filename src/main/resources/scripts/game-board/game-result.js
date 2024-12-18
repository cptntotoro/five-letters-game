//Функция отображения результата уровня
export const gameResultShow = (isVisible, isWin) => {
  const gameBoard = document.querySelector('.game-board');
  const keyboard = document.querySelector('.keyboard');
  const asideToolbar = document.querySelector('.aside__toolbar');
  const gameResult = document.querySelector('.game-result');
  const gameResultText = gameResult.querySelector('.game-result__text');
  const gameResultButton = gameResult.querySelector('.game-result__button');

  if (!isWin) {
    gameResultText.textContent = 'Проигрыш';
    gameResultButton.textContent = 'Попробовать снова?';
  } else {
    gameResultText.textContent = 'Победа'
    gameResultButton.textContent = 'Начать заново'
  }

  gameBoard.classList.toggle('hidden', isVisible);
  keyboard.classList.toggle('hidden', isVisible);
  asideToolbar.classList.toggle('hidden', isVisible);
  gameResult.classList.toggle('hidden', !isVisible);
};
