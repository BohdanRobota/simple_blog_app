const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Article = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String },
});

module.exports.ArticleModel = mongoose.model('Article', Article);
