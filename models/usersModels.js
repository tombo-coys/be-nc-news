const connection = require('../db/connection.js')

const fetchUserById = (username) => {
    return connection('users').first('*').where('username', username)
}

module.exports = { fetchUserById }