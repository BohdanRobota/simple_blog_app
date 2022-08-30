const router = require('express').Router();
const ArticleController = require('../controllers/ArticleController.js');


router.get('/articles',ArticleController.getAll);
router.post('/articles',ArticleController.create);
router.get('/articles/:id',ArticleController.getOne);
router.put('/articles/:id',ArticleController.update);
router.delete('/articles/:id',ArticleController.delete);

module.exports = router;