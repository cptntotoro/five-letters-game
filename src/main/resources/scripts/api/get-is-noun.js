// Запросы к API Яндекс.Словаря

const url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";
const queryParams = {
    key: "dict.1.1.20241223T145341Z.3b12b5595a264d2f.4250680a26aaca97a1ae7ad811e539c886877f6f",
    lang: "ru-ru",
    ui: "ru",
};

/**
 * Обработать ответ от API Яндекс.Словаря
 * @param word - пользовательское слово
 * @param errorHint - всплывающий элемент ошибки
 * @return {Promise<*>}
 */
export function validateUserWord(word, errorHint) {
    return getDictionaryResponse(word, errorHint).then((json) => {
        if (json.def.length === 0) {
            throw new Error("Такого слова не существует");
        }

        if (json.def[0].pos !== "существительное") {
            throw new Error("Необходимо ввести существительное");
        }
    });
}

/**
 * Получить ответ от API Яндекс.Словаря
 * @param word - пользовательское слово
 * @param errorHint - всплывающий элемент ошибки
 * @return {Promise<any>}
 */
const getDictionaryResponse = async (word, errorHint) => {
    queryParams["text"] = word;

    try {
        return await fetch(
            url + "?" + new URLSearchParams(queryParams).toString(),
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((res) =>
            res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
        );
    } catch (error) {
        errorHint.classList.add("hint-error__container-visible");
        errorHint.textContent = "Произошла ошибка сервера. Попробуйте позже";
    }
};
