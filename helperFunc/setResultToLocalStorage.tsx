function setResultToLocalStorage(result: boolean) {
  localStorage.getItem('result') === null &&
    localStorage.setItem('result', JSON.stringify([]));

  const dropLocalStoreResult = JSON.parse(localStorage.getItem('result'));
  dropLocalStoreResult.push(result);
  localStorage.setItem('result', JSON.stringify(dropLocalStoreResult));
}

export default setResultToLocalStorage;
