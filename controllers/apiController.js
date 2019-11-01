const fetchAllEndPoints = require('../models/apiModel')
const endPoints = require('../endpoints.json')

const getAllEndPoints = (req, res, next) => {
        res.status(200).json(endPoints)
}


module.exports = { getAllEndPoints }