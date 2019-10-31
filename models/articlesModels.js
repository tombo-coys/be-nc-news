const connection = require('../db/connection')
const { checkArticleExists, checkUserExists, checkTopicExists } = require('../db/utils/utils')

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
                else return updatedArticle[0]
            });
    } else return connection('articles').where('article_id', article_id).returning('*')
    // Promise.reject({
    //     status: 400,
    //     msg: 'Bad Request: You cannot update that key, only votes'
    // })
}

const sendComment = (comment, article_id) => {
    comment.author = comment.username;
    delete comment.username
    comment.article_id = article_id
    return connection('comments').insert(comment).returning('*')
}


const fetchCommentsForArticle = (article_id, sort_by, order) => {
    const allowedOrders = ['asc', 'desc', undefined];
    if (!allowedOrders.includes(order)) {
        return Promise.reject({
            status: 400,
            msg: `cannot order by ${order}, only ascending or descending`
        })
    }
    const commentResponse = connection('comments')
        .select('comment_id', 'votes', 'created_at', 'author', "body")
        .where('article_id', article_id)
        .orderBy(sort_by || "created_at", order || 'desc')
        .returning("*")
    const articleBool = checkArticleExists(article_id)
    return Promise.all([commentResponse, articleBool]).then(([commentResponse, articleBool]) => {
        if (commentResponse.length) {
            return commentResponse
        } else if (!commentResponse.length && articleBool) {
            return commentResponse
        } else return Promise.reject({
            status: 404,
            msg: 'Article ID does not exist'
        })

    })
}

const fetchAllArticles = (sort_by, order, author, topic) => {
    const allowedOrders = ['asc', 'desc', undefined];
    if (!allowedOrders.includes(order)) {
        return Promise.reject({
            status: 400,
            msg: `cannot order by ${order}, only ascending or descending`
        })
    }
    const articleResponse = connection('articles')
        .select('articles.article_id', 'articles.author', 'articles.title', 'articles.topic', 'articles.created_at', 'articles.votes')
        .leftJoin('comments', "articles.article_id", 'comments.article_id')
        .count('comment_id as comment_count')
        .groupBy('articles.article_id')
        .orderBy(sort_by || "created_at", order || 'desc')
        .modify((query) => {
            if (author) query.where('articles.author', author);
            if (topic) query.where('articles.topic', topic)
        })
    let authorBool = true;
    if (author) {
        authorBool = checkUserExists(author)
    }
    let topicBool = true;
    if (topic) {
        topicBool = checkTopicExists(topic)
    }
    return Promise.all([articleResponse, authorBool, topicBool]).then(([articleResponse, authorBool, topicBool]) => {
        if (articleResponse.length) {
            return articleResponse
        } else if (!articleResponse.length && authorBool && topicBool) {
            return articleResponse
        } else if (!articleResponse.length && topicBool && !author) {
            console.log('gets here')
            return articleResponse;
        } else if (!articleResponse.length && !topicBool) {
            return Promise.reject({
                status: 404,
                msg: 'Topic does not exist'
            })
        } else return Promise.reject({
            status: 404,
            msg: 'Author does not exist'
        })

    })
}

module.exports = { fetchArticles, patchArticle, sendComment, fetchCommentsForArticle, fetchAllArticles };