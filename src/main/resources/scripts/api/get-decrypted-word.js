import { config } from './config.js';

export const getDecryptedWord = async (decryptedWord) => {
  const { BASE_URL, METHOD, STATUSES, headers } = config;

  try {
    const response = await fetch(`${BASE_URL}/word?secret=${decryptedWord}`, {
      method: METHOD.POST,
      headers,
    });

    if (response.status === STATUSES.OK) {
      return response.json();
    }

  } catch (error) {
    alert('Запрос на получение расшифрованного слова не удался')
    console.log(error, ' Произошла ошибка сервера. Попробуйте позже');
  }
}
