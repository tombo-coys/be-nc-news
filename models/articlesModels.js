const connection = require('../db/connection')

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
    if(update.inc_votes){
        return connection('articles').where('article_id', article_id).increment('votes', update.inc_votes)
            .returning('*')
            .then((updatedArticle) => {
                if (!updatedArticle.length) return Promise.reject({
                    status: 404,
                    msg: 'Article ID does not exist'
                })
                else return updatedArticle
            });
    } else return Promise.reject({ status: 400,
        msg: 'Bad Request: You cannot update that key, only votes'})
}


module.exports = { fetchArticles, patchArticle };