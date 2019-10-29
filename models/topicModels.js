const connection = require('../db/connection.js')

const fetchTopics = () => {
    console.log('in the model')
    return connection('topics').select('*')
}

module.exports = { fetchTopics }