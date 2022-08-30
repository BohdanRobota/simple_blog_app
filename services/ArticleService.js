const Article = require('../models/article-model.js').ArticleModel;
const FileService = require('./FileService.js');

class ArticleService {
  async create(article, picture) {
    let fileName = 'plug/plug.png';
    if (picture) {
      fileName = FileService.saveFile(picture);
    }
    const createdArticle = await Article.create({ ...article, picture: fileName });
    return createdArticle;
  }

  async getAll() {
    const articles = await Article.find();
    return articles;
  }

  async getOne(id) {
    const article = await Article.findById(id);
    return article;
  }

  async update(id, article, picture) {
    if (!id) {
      throw new Error('Id не был указан');
    }
    const oldFile = await Article.findById(id);      
    let fileName = null;
    let updateFilter = article;
    if (picture) {
      fileName = FileService.saveFile(picture);
      updateFilter = { ...article, picture: fileName };
    }else{
      updateFilter.picture = oldFile.picture;
    }                
    const updatedArticle = await Article.findByIdAndUpdate(id, updateFilter, { new: true });
    if (oldFile.picture && picture) {
      await FileService.deleteFile(oldFile.picture);
    }
    return updatedArticle;
  }

  async delete(id) {
    if (!id) {
      throw new Error('Id не был указан');
    }
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (deletedArticle.picture) {
      await FileService.deleteFile(deletedArticle.picture);
    }
    return deletedArticle;
  }
}

module.exports = new ArticleService();
