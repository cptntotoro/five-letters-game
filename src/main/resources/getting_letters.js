function guessLetters(word1, word2) {

  const targetWord = word1.toLowerCase();
  const guessWord = word2.toLowerCase();

  // Объявляем объект массивов
  let obj_guess_mass = {
    arrayOne: []
  }

  // Объявляем массивы
  let correctPosition = [];
  let incorrectPosition = [];
  let notInTarget = [];

  // Добавляем массивы в объект
  obj_guess_mass.arrayOne.push(correctPosition);
  obj_guess_mass.arrayOne.push(incorrectPosition);
  obj_guess_mass.arrayOne.push(notInTarget);

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

  return obj_guess_mass.arrayOne;
}

try {
  const result = guessLetters(word1, word2);
  console.log('Буквы на своих позициях:', result[0].join(','));
  console.log('Буквы в слове, но не на своих позициях:', result[1].join(','));
  console.log('Буквы не в слове:', result[2].join(','));
}
catch (error) {
  console.error(error.message);
}