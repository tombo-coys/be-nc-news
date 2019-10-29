const articlesRouter = require('express').Router();
const { getArticles } = require('../controllers/articlesController.js')
const { methodNotAllowed } = require('../db/utils/errorHandling')

articlesRouter.route('/:article_id').get(getArticles).all(methodNotAllowed)

module.exports = articlesRouter;