const commentsRouter = require('express').Router();
const { methodNotAllowed } = require('../db/utils/errorHandling')
const { updateComment, deleteComment } = require('../controllers/commentsController')

commentsRouter.route('/:comment_id').patch(updateComment).delete(deleteComment).all(methodNotAllowed)

module.exports = commentsRouter;