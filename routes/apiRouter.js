const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topicsRouter')
const usersRouter = require('./usersRouter')
const articlesRouter = require('./articlesRouter')
const commentsRouter = require('../routes/commentsRouter')


apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)




module.exports = apiRouter