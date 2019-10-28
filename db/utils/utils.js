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
