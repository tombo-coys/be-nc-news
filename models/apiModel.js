const connection = require('../db/connection.js')
const endPoints = require('../endpoints.json')


exports.fetchAllEndPoints = () => {
    console.log(endPoints)
    return endPoints;
}


