const articlesRouter = require('express').Router();
const { getArticles } = require('../controllers/articlesController.js')

articlesRouter.route('/:article_id').get(getArticles)

module.exports = articlesRouter;