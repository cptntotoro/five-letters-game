import { getWord } from './api/getWord.js';

const logWord = async () => {
  const data = await getWord();
  if (data) {
    console.log(data.word);
  }
}

logWord();
