function guessLetters(word1, word2) {

  const targetWord = word1.toLowerCase();
  const guessWord = word2.toLowerCase();

  // Объявляем массивы
  let correctPosition = [];
  let incorrectPosition = [];
  let notInTarget = [];

  // Проверяем буквы в слове
  for (let i = 0; i < guessWord.length; i++) {
    if (guessWord[i] === targetWord[i]) {
      correctPosition.push(targetWord[i]);
    }
    if (targetWord.includes(guessWord[i])) {
      if ((!correctPosition.includes(guessWord[i])) || (correctPosition.includes(guessWord[i]) && guessWord[i] !== targetWord[i])) {
        incorrectPosition.push(guessWord[i]);
      }
    } else {
      notInTarget.push(guessWord[i]);
    }
  }

  // Объявляем объект
  const result_guess = {
    correctPosition,
    incorrectPosition,
    notInTarget
  };

  return result_guess;
}