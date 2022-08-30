const articleTitle = document.querySelector('#article-title');
const articleDescription = document.querySelector('#article-description');
const addArticleBtn = document.querySelector('#add-article');
const mainForm = document.querySelector('.add-articles-box');

mainForm.addEventListener('submit',addNewArticle);
// addArticleBtn.addEventListener('click',addNewArticle);

async function addNewArticle(e){
  e.preventDefault();
  const img = document.querySelector('.article-img');
  if(articleTitle.value !== '' && articleDescription.value !== ''){
    const formData = new FormData();
    formData.append("picture", img.files[0]);
    formData.append("description", articleDescription.value);
    formData.append("title", articleTitle.value);
    const response = await fetch('api/articles',{
      method:'POST',
      body: formData
    });
    if(response.ok){
      alert("Article added successfully");
    }else{
      alert("Error HTTP: " + response.status);
    }
    articleTitle.value = '';
    articleDescription.value = '';
    img.value = '';
  }
}