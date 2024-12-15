function guessLetters(word1, word2) {
  // Проверяем корректность входных данных  
  if (word1.length !== 5 || word2.length !== 5 ) {
      throw new Error('Длина слов должна быть 5 символов');
  }

  const targetWord = word1.toLowerCase();
  const guessWord = word2.toLowerCase();

  let correctPosition = [];
  let incorrectPosition = [];
  let notInTarget = [];

  // Проверяем буквы на своих позициях
  for (let i = 0; i < guessWord.length; i++) {
      if (guessWord[i] === targetWord[i]) {
          correctPosition.push(targetWord[i]);
      }
  }

  // Проверяем буквы в целом слове
  for (let i = 0; i < guessWord.length; i++) {
      if (targetWord.includes(guessWord[i])) {
          if (!correctPosition.includes(guessWord[i])) {
              incorrectPosition.push(guessWord[i]);
          }
      } else {
          notInTarget.push(guessWord[i]);
      }
  }

  return [correctPosition, incorrectPosition, notInTarget];
}

// Настраиваем ввод слова
let inputIn = document.querySelector('.input-word');
let button = document.querySelector('.button-in');

// Слово, которое необходимо отгадать
const word1 = 'pulse';

try {
  button.onclick = function () {
    // Слово, которое вводит пользователь
    let word2 = inputIn.value; 
    console.log(word2);
  const result = guessLetters(word1, word2);
  console.log('Буквы на своих позициях:', result[0].join(','));
  console.log('Буквы в слове, но не на своих позициях:', result[1].join(','));
  console.log('Буквы не в слове:', result[2].join(','));
  }
} 
catch (error) {
  console.error(error.message);
}