const articlesRouter = require('express').Router();
const { getArticles, updateArticle, postComment, getCommentsForArticle, getAllArticles } = require('../controllers/articlesController.js')
const { methodNotAllowed } = require('../db/utils/errorHandling')

articlesRouter.route('/').get(getAllArticles).all(methodNotAllowed)
articlesRouter.route('/:article_id').get(getArticles).patch(updateArticle).all(methodNotAllowed)
articlesRouter.route('/:article_id/comments').post(postComment).get(getCommentsForArticle).all(methodNotAllowed)

module.exports = articlesRouter;