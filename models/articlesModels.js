const connection = require('../db/connection')
const { checkArticleExists } = require('../db/utils/utils')

const fetchArticles = (article_id) => {
    return connection('articles').select('articles.*').where("articles.article_id", article_id)
        .leftJoin('comments', "articles.article_id", 'comments.article_id')
        .count('comment_id as comment_count').groupBy('articles.article_id')
        .then((article) => {
            if (!article.length) return Promise.reject({
                status: 404,
                msg: 'Article ID does not exist'
            })
            else return article[0];
        })
}

const patchArticle = (update, article_id) => {
    if (update.inc_votes) {
        return connection('articles').where('article_id', article_id).increment('votes', update.inc_votes)
            .returning('*')
            .then((updatedArticle) => {
                if (!updatedArticle.length) return Promise.reject({
                    status: 404,
                    msg: 'Article ID does not exist'
                })
                else return updatedArticle
            });
    } else return Promise.reject({
        status: 400,
        msg: 'Bad Request: You cannot update that key, only votes'
    })
}

const sendComment = (comment, article_id) => {
    comment.author = comment.username;
    delete comment.username
    comment.article_id = article_id
    return connection('comments').insert(comment).returning('*')
}


const fetchCommentsForArticle = (article_id) => {
    const commentResponse = connection('comments')
        .select('comment_id', 'votes', 'created_at', 'author', "body")
        .where('article_id', article_id)
        .returning("*")
    const articleBool = checkArticleExists(article_id)
    return Promise.all([commentResponse, articleBool]).then(([commentResponse, articleBool]) => {
        if (commentResponse.length) {
            return commentResponse
        } else if (!commentResponse.length && articleBool) {
            return commentResponse
        } else return Promise.reject({
            status: 404,
            msg: 'Article ID does not exisit'
        })

    })
}

module.exports = { fetchArticles, patchArticle, sendComment, fetchCommentsForArticle };