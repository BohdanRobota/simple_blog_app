const ArticleService = require('../services/ArticleService');
const log = require(INCPATH + '/log')(module);

class ArticleController {
  async create(req, res) {
    try {
      const article = await ArticleService.create(req.body, req.files?.picture || null);
      log.info('Article created');
      res.json(article);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async getAll(req, res) {
    try {
      const articles = await ArticleService.getAll();
      log.info('Get all Articles');
      res.json(articles);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async getOne(req, res) {
    try {
      log.info('Get one Article');
      const article = await ArticleService.getOne(req.params.id);
      res.json(article);
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async update(req, res) {
    try {
      const updatedArticle = await ArticleService.update(req.params.id, req.body, req.files?.picture || null);
      log.info('Article updated');
      return res.json(updatedArticle);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  async delete(req, res) {
    try {
      const deletedArticle = await ArticleService.delete(req.params.id);
      log.info('Article deleted');
      return res.json(deletedArticle);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = new ArticleController();
