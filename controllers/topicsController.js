const { fetchTopics } = require('../models/topicModels');

const getTopics = (req, res, next) => {
    console.log('in the controller');
    fetchTopics().then(topics => {
        res.status(200).json({ topics })
    })
}

module.exports = { getTopics }