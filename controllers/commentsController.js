const { patchComment, removeComment } = require('../models/commentsModels')

const updateComment = (req, res, next) => {
    const comment = req.body
    const { comment_id } = req.params
    patchComment(comment, comment_id).then(comment => {
        res.status(200).json({ comment })
    }).catch(next)
}

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    removeComment(comment_id).then(() => {
        res.sendStatus(204)
    }).catch(next)
}

module.exports = { updateComment, deleteComment }