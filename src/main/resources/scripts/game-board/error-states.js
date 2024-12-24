/**
 * Включить / выключить состояние ошибки у ячеек и всплывающего элемента ошибки
 * @param isActive - нужно ли включить
 * @param inputs - активные ячейки
 * @param errorHint - всплывающий элемент ошибки
 * @param errorMessage - сообщение ошибки
 */
export function toggleErrorState(isActive, inputs, errorHint, errorMessage) {
    if (isActive) {
        toggleErrorHint(true, errorHint, errorMessage);
        inputs.forEach((input) => {
            input.classList.add("input-error");
            input.removeAttribute("disabled");
        });
    } else {
        toggleErrorHint(false, errorHint, null);
        inputs.forEach((input) => {
            input.classList.remove("input-error");
        });
    }
}

/**
 * Отобразить / скрыть всплывающий элемент ошибки
 * @param isActive - нужно ли включить
 * @param errorHint - всплывающий элемент ошибки
 * @param errorMessage - сообщение ошибки
 */
export function toggleErrorHint(isActive, errorHint, errorMessage = "") {
    if (isActive) {
        errorHint.classList.add("hint-error__container-visible");
        errorHint.textContent = errorMessage;
    } else {
        errorHint.classList.remove("hint-error__container-visible");
        errorHint.textContent = errorMessage;
    }
}