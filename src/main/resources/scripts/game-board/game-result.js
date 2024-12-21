export const showGameResult = (isWin, hasNextLevel, startNextLevelFunc) => {
  const gameResult = document.querySelector('.game-result');
  const gameResultText = gameResult.querySelector('.game-result__text');
  const gameResultButton = gameResult.querySelector('.game-result__button');
  const gameBoard = document.querySelector('.game-board');
  const keyboard = document.querySelector('.keyboard');
  const asideToolbar = document.querySelector('.aside__toolbar');

  if (!isWin) {
    gameResultText.textContent = 'Проигрыш';
    gameResultButton.textContent = 'Попробовать снова?';
  } else if (hasNextLevel) {
    gameResultText.textContent = 'Победа';
    gameResultButton.textContent = 'Следующий уровень';
    gameResultButton.addEventListener('click', startNextLevelFunc, { once: true });
  } else {
    gameResultText.textContent = 'Победа';
    gameResultButton.textContent = 'Начать заново';
  }

  gameBoard.classList.toggle('hidden', true);
  keyboard.classList.toggle('hidden', true);
  asideToolbar.classList.toggle('hidden', true);
  gameResult.classList.toggle('hidden', false);
};