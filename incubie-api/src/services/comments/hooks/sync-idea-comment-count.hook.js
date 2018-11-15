const { get } = require('lodash')

module.exports = (options = {}) => async function syncIdeaCommentCount (context) {
  const { app } = context
  const idea = get(context, 'result.idea')

  if (!idea) {
    return
  }

  const { total } = await app.service('comments').find({
    query: {
      idea,
      $limit: 0
    }
  })

  await app.service('ideas').patch(idea, {
    commentCount: total
  })
}
