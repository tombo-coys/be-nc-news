const topicsRouter = require('express').Router();
const { getTopics } = require('../controllers/topicsController');
const { methodNotAllowed } = require('../db/utils/errorHandling')

topicsRouter.route('/').get(getTopics).all(methodNotAllowed)

module.exports = topicsRouter;