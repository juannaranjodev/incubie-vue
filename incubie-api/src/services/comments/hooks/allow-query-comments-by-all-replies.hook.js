const { get } = require('lodash')

module.exports = (options = {}) => async function allowQueryCommentsByAllRepliesHook (context) {
  const allReplies = get(context, 'params.query.allReplies')

  if (allReplies) {
    context.params.allReplies = true
    delete context.params.query.allReplies
  }
}
