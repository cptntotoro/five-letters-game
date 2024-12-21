export const copyLinkToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Ошибка при копировании ссылки: ', err);
    alert('Не удалось скопировать ссылку. Попробуйте снова.');
  }
}