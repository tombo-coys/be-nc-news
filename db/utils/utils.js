exports.formatDates = list => {
    if (!list.length) return [];
    return list.map(item => {
        const itemCopy = { ...item };
        itemCopy.created_at = new Date(itemCopy.created_at)
        return itemCopy
    })
};

exports.makeRefObj = list => { 

    
};

exports.formatComments = (comments, articleRef) => { };
