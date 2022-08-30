titleSearchOptions = {
  inputClass: '.title-search',
  searchTextClass: '.card-title',
  searchItemsClass: '.article-item',
};
class liveSearch {
  constructor(options) {
    this.searchInput = document.querySelector(options.inputClass);
    this.searchInput.value = sessionStorage.getItem(this.searchInput);
    this.searchText = options.searchTextClass;
    this.searchItems = document.querySelectorAll(options.searchItemsClass);
    this.setEvent();
    this.addLiveSearch();
  }
  setEvent() {
    this.searchInput.addEventListener('input', this.addLiveSearch.bind(this));
  }
  addLiveSearch() {
    sessionStorage.setItem(this.searchInput, this.searchInput.value);
    let currentValue = sessionStorage.getItem(this.searchInput).trim().toLowerCase();
    if (currentValue !== '') {
      this.hideElements(currentValue);
    } else {
      this.showElements();
    }
  }

  hideElements(currentValue) {
    this.searchItems.forEach((elem) => {
      let currentText = elem.querySelector(this.searchText);
      if (currentText.innerText.toLowerCase().search(currentValue) === -1) {
        elem.classList.add('hide');
        currentText.innerHTML = currentText.innerText;
      } else {
        elem.classList.remove('hide');
        const currentStr = currentText.innerText;
        currentText.innerHTML = this.insertMark(currentStr,currentText.innerText.toLowerCase().search(currentValue),currentValue.length);
      }
    });
  }
  showElements() {
    this.searchItems.forEach((elem) => {
      const currentText = elem.querySelector(this.searchText);
      elem.classList.remove('hide');
      currentText.innerHTML = currentText.innerText;
    });
  }
  insertMark(string, pos, len) {
    return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
  }
}

