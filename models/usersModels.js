const connection = require('../db/connection.js')

const fetchUserById = (username) => {
    return connection('users').first('*').where('username', username).then((response) => {
        if (!response) return Promise.reject({
            status: 404,
            msg: 'Username does not exisit'
        })
        else return response;
    })
}

module.exports = { fetchUserById }