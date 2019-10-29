const apiRouter = require('express').Router();
const topicsRouter = require('../routes/topicsRouter')
const usersRouter = require('./usersRouter')
const { customErrors } = require('../db/utils/errorHandling')

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter);





apiRouter.use(customErrors)

module.exports = apiRouter