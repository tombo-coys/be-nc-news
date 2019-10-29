const { fetchUserById } = require('../models/usersModels')

const getUserById = (req, res, next) => {
    const { username } = req.params;
    fetchUserById(username).then(user => {
        res.status(200).json({ user })
    })
}

module.exports = { getUserById };