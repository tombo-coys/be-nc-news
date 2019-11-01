const fetchAllEndPoints = require('../models/apiModel')
//const endPoints = require('../endpoints.json')

const getAllEndPoints = (req, res, next) => {
    // console.log(endPoints)
    fetchAllEndPoints().then((endpoints) => {
        res.status(200).json({ endpoints })
    })
}


module.exports = { getAllEndPoints }