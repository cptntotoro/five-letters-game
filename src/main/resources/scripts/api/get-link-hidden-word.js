import { config } from './config.js';

export const getLinkHiddenWord = async (word) => {
  const { BASE_URL, METHOD, STATUSES, headers } = config;

  try {
    const response = await fetch(`${BASE_URL}/link?word=${word}`, {
      method: METHOD.GET,
      headers,
    });

    if (response.status === STATUSES.OK) {
      return response.json();
    }

  } catch (error) {
    alert('Запрос на получение ссылки не удался')
    console.log(error, ' Произошла ошибка сервера. Попробуйте позже');
  }
}
