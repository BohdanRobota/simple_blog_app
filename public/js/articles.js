const root = document.querySelector('.main-content');
let deleteBtn;
let editBtn;
const articleContainer = document.querySelector('.main-content');


function createArticle(articleData) {
  root.insertAdjacentHTML(
    'afterbegin',
    `<div class="card mb-3 article-item" data-id = "${articleData._id}">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="./images/${articleData.picture}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${articleData.title}</h5>
            <p class="card-description">${articleData.description}</p>
            <div class = "buttons-wrapper">
            <button href="#" class="btn btn-primary edit-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
            <button type="button" class="btn btn-danger delete-modal" data-bs-toggle="modal" data-bs-target="#exampleModal2">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  );
}

function createPlug(root) {
  const plugElem = document.createElement('h2');
  plugElem.innerText = 'There are no articles here yet(  But you can create new!';
  root.append(plugElem);
}

function getAllArticles() {
  fetch('http://localhost:3000/api/articles')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        createPlug(root);
        return;
      }
      data.forEach((article) => {
        createArticle(article);
      });
      addEvents();
    })
    .then(() => {
      const articleSearh = new liveSearch(titleSearchOptions);
    });
}

async function deleteArticle(event, parent) {
  parent.style.display = 'none';
  const id = parent.dataset.id;
  let response = await fetch('api/articles/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });
}

async function editArticle(id, parentTitle, parentDescription, parentImage) {
  const editingDescription = document.querySelector('.edit-description');
  const editingTitle = document.querySelector('.edit-title');
  const editingImage = document.querySelector('.edit-img');
  const formData = new FormData();
  if(editingImage.files[0]){
    formData.append("picture", editingImage.files[0]);
  } else{
    formData.append("picture", null);
  }
  formData.append("description", editingDescription.value);
  formData.append("title", editingTitle.value);
  const response = await fetch('api/articles/' + id, {
    method: 'PUT',
    body: formData
  });
 
  if (response.ok) {
    parentTitle.innerText = editingTitle.value;
    parentDescription.innerText = editingDescription.value;
    if(editingImage.files[0]) parentImage.src = URL.createObjectURL(editingImage.files[0]);
  } else {
    alert('Error HTTP: ' + response.status);
  } 
  editingImage.value = '';
  destroyEvent(editBtn);
  destroyArticlesEvents();
  addEvents();
}
function destroyEvent(el){
    const elClone = el.cloneNode(true);
    el.parentNode.replaceChild(elClone, el);
    return elClone;
}
function destroyArticlesEvents() {
  const articleItems = document.querySelectorAll('.article-item');
  articleItems.forEach((article) => { 
    const elClone = article.cloneNode(true);
    article.parentNode.replaceChild(elClone, article);
  });
}

function readFile(input) {
  const file = input.files[0];

  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    return reader.result;
  };

  reader.onerror = function() {
    return reader.error;
  };

}

function addEvents() {
  const articleItems = document.querySelectorAll('.article-item');
  editBtn = document.querySelector('.edit-article');
  deleteBtn = document.querySelector('.delete-article')
  articleItems.forEach((article) => {
    article.addEventListener('click', (event) => {
      if (event.target.className.includes('delete-modal')) {
        deleteBtn = destroyEvent(deleteBtn);
        const current = event.currentTarget;
        deleteBtn.addEventListener('click', (event) => {
          deleteArticle(event, current);
        });
      }
      if (event.target.className.includes('edit-modal')) {
        editBtn = destroyEvent(editBtn);
        const current = event.currentTarget;
        const editingDescription = document.querySelector('.edit-description');
        const editingTitle = document.querySelector('.edit-title');
        const currentTitle = current.querySelector('.card-title');
        const currentDescription = current.querySelector('.card-description');
        const currentImage = current.querySelector('.img-fluid');
        editingDescription.value = currentDescription.innerText;
        editingTitle.value = currentTitle.innerText;
        editBtn.addEventListener('click', editArticle.bind(null, current.dataset.id, currentTitle, currentDescription,currentImage));
      }
    });
  });
}


getAllArticles();
