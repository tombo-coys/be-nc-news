const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/usersController')
const { methodNotAllowed } = require('../db/utils/errorHandling')


usersRouter.route('/:username').get(getUserById).post().all(methodNotAllowed)

module.exports = usersRouter;