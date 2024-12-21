import { config } from './config.js';

export const getWord = async () => {
  const { BASE_URL, METHOD, STATUSES, headers } = config;

  try {
    const response = await fetch(`${BASE_URL}/word`, {
      method: METHOD.GET,
      headers
    });

    if (response.status === STATUSES.OK) {
      return response.json();
    } else if (response.status === STATUSES.NO_CONTENT) {
      console.log('Поздравляем, вы отгадали все слова!');
    }

  } catch (error) {
    console.log(error, ' Произошла ошибка сервера. Перезагрузите страницу');
  }
}