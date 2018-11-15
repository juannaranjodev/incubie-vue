const { get } = require('lodash')

function flattenReplies (replies, flattened) {
  replies.forEach(reply => {
    flattenReply(reply, flattened)
  })
}

function flattenReply (reply, flattened) {
  const replies = get(reply, 'replies', [])
  flattened.push(reply)

  flattenReplies(replies, flattened)
}

module.exports = (options = {}) => async function flattenCommentRepliesHook (context) {
  const allReplies = get(context, 'params.allReplies')
  const comments = get(context, 'result.data', [])
  const flattened = []

  if (allReplies) {
    comments.forEach(comment => {
      if (comment.replies) {
        flattenReplies(comment.replies, flattened)
      }
    })

    context.result.data = comments.concat(flattened)
    context.result.total = context.result.data.length
  }
}
