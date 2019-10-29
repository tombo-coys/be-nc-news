const { fetchTopics } = require('../models/topicModels');

const getTopics = (req, res, next) => {
    fetchTopics().then(topics => {
        res.status(200).json({ topics })
    })
}

module.exports = { getTopics }