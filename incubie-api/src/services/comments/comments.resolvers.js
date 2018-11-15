const { makeCallingParams } = require('feathers-hooks-common')
const BatchLoader = require('@feathers-plus/batch-loader')
const { getResultsByKey, getUniqueKeys, loaderFactory } = BatchLoader
const { get } = require('lodash')

module.exports = {
  before: context => {
    const { app } = context

    context._loaders = { replies: {}, replyIds: {} }
    context._loaders.replies = new BatchLoader(async (keys, context) => {
      const result = await app.service('comments').find({
        query: {
          parent: {
            $in: getUniqueKeys(keys)
          }
        },
        paginate: false
      })

      return getResultsByKey(keys, result, comment => comment.parent, '[!]')
    }, { context })
  },
  joins: {
    replies: () => async (comment, context) => {
      comment.replies = await context._loaders.replies.load(comment._id) || []
    },
    votes: () => async (comment, context) => {
      const { app } = context
      const votes = await app.service('votes').find({
        query: {
          parent: comment._id,
          $select: ['voter']
        },
        paginate: false
      })

      comment.votes = votes
    }
  }
}
