const { fetchArticles } = require('../models/articlesModels');

const getArticles = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticles(article_id).then(article => {
        res.status(200).json({ article })
    }).catch(next)
}


module.exports = { getArticles };