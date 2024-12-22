export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    alert('Ошибка копирования текста: ', error)
  }
}
