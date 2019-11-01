
const endPoints = require('../endpoints.json')

const getAllEndPoints = (req, res, next) => {
  res.status(200).json(endPoints)
}.catch (next)


module.exports = { getAllEndPoints }