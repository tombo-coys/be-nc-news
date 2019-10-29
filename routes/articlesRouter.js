const articlesRouter = require('express').Router();
const { getArticles, updateArticle } = require('../controllers/articlesController.js')
const { methodNotAllowed } = require('../db/utils/errorHandling')

articlesRouter.route('/:article_id').get(getArticles).patch(updateArticle).all(methodNotAllowed)

module.exports = articlesRouter;