const connection = require('../connection')

exports.formatDates = list => {
    if (!list.length) return [];
    return list.map(item => {
        const itemCopy = { ...item };
        itemCopy.created_at = new Date(itemCopy.created_at)
        return itemCopy
    })
};

exports.makeRefObj = list => {
    return list.reduce((refObj, item) => {
        refObj[item.title] = item.article_id
        return refObj
    }, {})
};

exports.formatComments = (comments, articleRef) => {
    const newComments = comments.map(oldComment => {
        const comment = { ...oldComment };
        const articleID = articleRef[comment.belongs_to];
        comment.article_id = articleID;
        delete comment.belongs_to
        comment.author = comment.created_by
        delete comment.created_by
        return comment;
    })
    return newComments;
};

exports.checkArticleExists = (article_id) => {
    return connection('articles').select('*').where('article_id', article_id).then((article) => {
        if (article.length) {
            return true
        } else return false;
    })
}

exports.checkUserExists = (author) => {
    return connection('users').select('*').where('username', author).then((author) => {
        if (author.length) {
            return true
        } else return false;
    })
}

exports.checkTopicExists = (topic => {
    return connection('topics').select('*').where('slug', topic).then((topic) => {
        if (topic.length) {
            return true
        } else return false
    })
})
