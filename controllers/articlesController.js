const { fetchArticles, patchArticle } = require('../models/articlesModels');

const getArticles = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticles(article_id).then(article => {
        res.status(200).json({ article })
    }).catch(next)
}


const updateArticle = (req, res, next) => {
    const { article_id } = req.params;
    const update = req.body

    patchArticle(update, article_id).then( updateArticle => {
    //console.log(updateArticle)
    res.status(200).json({ updateArticle })
}).catch (next)
}


module.exports = { getArticles, updateArticle };