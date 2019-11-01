const fetchAllEndPoints = require('../models/apiModel')
const endPoints = require('../endpoints.json')

const getAllEndPoints = (req, res, next) => {
  //  console.log(endPoints)
   const endpointsJson = JSON.stringify(endPoints)
        res.status(200).json({ endpointsJson })
}


module.exports = { getAllEndPoints }