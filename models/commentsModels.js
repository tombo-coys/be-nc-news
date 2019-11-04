const connection = require('../db/connection')
const { checkCommentExists } = require('../db/utils/utils')

const patchComment = (comment, comment_id) => {
    if (comment.inc_votes) {
        return connection('comments').where('comment_id', comment_id).increment('votes', comment.inc_votes).returning("*")
            .then((returnedComment) => {
                if (!returnedComment.length) return Promise.reject({
                    status: 404,
                    msg: 'Comment does not exist'
                })
                else return returnedComment[0]
            })
    } else return connection('comments').where('comment_id', comment_id).then((comment) => {
        return comment[0]
    })
  }



const removeComment = (comment_id) => {
    const removedComment = connection('comments').where('comment_id', comment_id).del().returning("*")
    const commentBool = checkCommentExists(comment_id)
    return Promise.all([removedComment, commentBool]).then(([removedComment, commentBool]) => {
        if (commentBool) {
            return removedComment;
        } else return Promise.reject(
            {
                status: 404,
                msg: 'Comment ID does not exist'
            }
        )
    })
}

module.exports = { patchComment, removeComment }