const gameResult = document.querySelector('.game-result');
const gameResultText = gameResult.querySelector('.game-result__text');
const gameResultButton = gameResult.querySelector('.game-result__button');
const gameBoard = document.querySelector('.game-board');
const keyboard = document.querySelector('.keyboard');
const asideToolbar = document.querySelector('.aside__toolbar');
const resultStars = document.querySelectorAll('.game-result__star');

const showGameResult = (isWin, hasNextLevel, resetGameFunc) => {
  if (!isWin) {
    resultStars.forEach((star) => star.style.color = '#CF3F3F');

    gameResultText.textContent = 'Проигрыш';
    gameResultButton.textContent = 'Попробовать снова?';
    gameResultButton.addEventListener('click', () => {
      resetGameFunc();
    }, { once: true });
  } else if (hasNextLevel) {
    resultStars.forEach((star) => star.style.color = '#C1EF5D');
    gameResultText.textContent = 'Победа';
    gameResultButton.textContent = 'Следующий уровень';
    gameResultButton.addEventListener('click', () => {
      resetGameFunc();
    }, { once: true });
  } else {
    gameResultText.textContent = 'Победа';
    resultStars.forEach((star) => star.style.color = '#C1EF5D');
    gameResultButton.textContent = 'Начать заново';
    gameResultButton.addEventListener('click', () => {
      resetGameFunc();
    }, { once: true });
  }

  gameBoard.classList.toggle('hidden', true);
  keyboard.classList.toggle('hidden', true);
  asideToolbar.classList.toggle('hidden', true);
  gameResult.classList.toggle('hidden', false);
};

const hideGameResult = () => {
  gameResult.classList.toggle('hidden', true);
  gameBoard.classList.toggle('hidden', false);
  keyboard.classList.toggle('hidden', false);
  asideToolbar.classList.toggle('hidden', false);
};

export { showGameResult, hideGameResult };