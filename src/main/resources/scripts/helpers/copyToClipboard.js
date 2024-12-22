export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Текст успешно скопирован:', text);
  } catch (error) {
    console.error('Ошибка копирования текста:', error);
  }
}
