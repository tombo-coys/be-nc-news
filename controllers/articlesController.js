const { fetchArticles, patchArticle, sendComment, fetchCommentsForArticle } = require('../models/articlesModels');

const getArticles = (req, res, next) => {
    const { article_id } = req.params;
    fetchArticles(article_id).then(article => {
        res.status(200).json({ article })
    }).catch(next)
}


const updateArticle = (req, res, next) => {
    const { article_id } = req.params;
    const update = req.body

    patchArticle(update, article_id).then(updateArticle => {
        res.status(200).json({ updateArticle })
    }).catch(next)
}

const postComment = (req, res, next) => {
    const comment = req.body;
    const { article_id } = req.params;
    sendComment(comment, article_id).then(returnedComment => {
        res.status(201).json({ returnedComment })
    }).catch(next)
}

const getCommentsForArticle = (req, res, next) => {
    const { article_id } = req.params;
    fetchCommentsForArticle(article_id).then(comments => {
        res.status(200).json({ comments })
    }).catch(next)
}


module.exports = { getArticles, updateArticle, postComment, getCommentsForArticle };