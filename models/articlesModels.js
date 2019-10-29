const connection = require('../db/connection')

const fetchArticles = (article_id) => {

    return connection('articles').select('articles.*').where("articles.article_id", article_id)
        .leftJoin('comments', "articles.article_id", 'comments.article_id')
        .count('comment_id as comment_count').groupBy('articles.article_id')
        .then((article) => {
            return article[0];
        })
}

module.exports = { fetchArticles };