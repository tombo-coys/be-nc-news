const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/usersController')


usersRouter.route('/:username').get(getUserById)

module.exports = usersRouter;