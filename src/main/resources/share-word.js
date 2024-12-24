// helpers
import { getLinkHiddenWord } from "./scripts/api/get-link-hidden-word.js";
import { copyToClipboard } from "./scripts/helpers/copy-to-clipboard.js";
import { validateInput } from "./scripts/helpers/validate-input.js";
import { validateUserWord } from "./scripts/api/get-is-noun.js";
// error states
import { toggleErrorState } from "./scripts/game-board/error-states.js";

// Переменная для хранения активного инпута
let activeInputIndex = 0;

export const linkButton = document.querySelector(".aside__toolbar-button-link");
const inputs = document.querySelectorAll(".game-board__input");
// кнопка виртуальной клавиатуры
const keyboardButtons = document.querySelectorAll(".keyboard__button");
// Элемент для отображения ошибок
const errorHint = document.querySelector(".hint-error__server");
const toast = document.querySelector(".toast");

// Функция для установки фокуса на активный инпут
function setActiveInput(index) {
    if (index >= 0 && index < inputs.length) {
        activeInputIndex = index;
        inputs[activeInputIndex].focus();
    }
}

toggleLinkButton(false);

validateInput(inputs, checkInputRowHiddenWordCompletion);

// Функция проверки заполненности всех полей
function checkAllInputsFilled() {
    const allFilled = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
    );
    toggleLinkButton(allFilled);
}

// Устанавливаем обработчики для кнопок виртуальной клавиатуры
keyboardButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const key = button.textContent.trim(); // Текст кнопки

        if (key) {
            // Если есть активный инпут, добавляем в него текст
            const currentInput = inputs[activeInputIndex];
            if (currentInput && !currentInput.disabled) {
                currentInput.value = key;

                // Проверка заполненности всех инпутов
                checkAllInputsFilled();

                // Переходим к следующему инпуту
                setActiveInput(activeInputIndex + 1);
            }
        } else if (button.classList.contains("keyboard__button-delete")) {
            // Удаление символа
            const currentInput = inputs[activeInputIndex];
            if (currentInput && !currentInput.disabled) {
                currentInput.value = "";

                // Проверка заполненности всех инпутов
                checkAllInputsFilled();
            } else if (activeInputIndex > 0) {
                setActiveInput(activeInputIndex - 1);
                inputs[activeInputIndex].value = "";

                // Проверка заполненности всех инпутов
                checkAllInputsFilled();
            }
        }
    });
});

// Инициализация
setActiveInput(0);
inputs.forEach((input, index) =>
    input.addEventListener("focus", () => (activeInputIndex = index))
);

// Обработчик кнопки ссылки
const copyLinkHiddenWord = async () => {
    const hiddenWord = getHiddenWordFromInputs(inputs);

    setTimeout(() => toggleErrorState(false, inputs, errorHint, null), 2000);

    validateUserWord(hiddenWord, errorHint)
        .then(async () => {
            const data = await getLinkHiddenWord(hiddenWord);
            await copyToClipboard(data.link);
        })
        .catch((e) => {
            toast.hidePopover();
            toggleErrorState(true, inputs, errorHint, e.message);
        });
};

linkButton.addEventListener("click", copyLinkHiddenWord);
validateInput(inputs, checkAllInputsFilled);
// Проверка всех полей при загрузке
checkAllInputsFilled();

function toggleLinkButton(isActive) {
    if (isActive) {
        linkButton.classList.remove("aside__toolbar-button-link-disabled");
        linkButton.classList.add("aside__toolbar-button-link-enabled");
    } else {
        linkButton.classList.add("aside__toolbar-button-link-disabled");
        linkButton.classList.remove("aside__toolbar-button-link-enabled");
    }
}

function checkInputRowHiddenWordCompletion(inputs) {
    const isRowComplete = Array.from(inputs).every(
        (input) => input.value.trim() !== ""
    );
    toggleLinkButton(isRowComplete);
}

function getHiddenWordFromInputs(inputs) {
    let word = "";
    inputs.forEach((input) => (word += input.value));
    return word;
}
