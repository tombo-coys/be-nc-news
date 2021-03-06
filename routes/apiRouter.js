const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topicsRouter')
const usersRouter = require('./usersRouter')
const articlesRouter = require('./articlesRouter')
const commentsRouter = require('../routes/commentsRouter')
const { methodNotAllowed } = require('../db/utils/errorHandling')
const {getAllEndPoints} = require('../controllers/apiController')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.route('/').get(getAllEndPoints).all(methodNotAllowed)

module.exports = apiRouter