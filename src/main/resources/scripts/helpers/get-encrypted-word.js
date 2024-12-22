export const getEncryptedWord = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const encryptedWord = urlParams.get('secret');

  console.log(queryString, urlParams, encryptedWord);

  return encryptedWord;
}