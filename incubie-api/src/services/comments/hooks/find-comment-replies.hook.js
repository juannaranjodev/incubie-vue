const { get, set } = require('lodash')

module.exports = (options = {}) => async function findCommentRepliesHook (context) {
  const { app, params } = context
  const { parent } = params.query

  // if (parent) {
  //   console.log('----------')
  //   console.log(parent)
  // }

  // const { app } = context
  // const comments = get(context, 'result.data', [])
  // const parent = get(context, 'params.query.parent')
  //
  // if (!parent) {
  //   return
  // }
  //
  // const ids = comments.map(comment => comment._id)
  // console.log(ids)
  //
  // if (ids.length) {
  //   const comments = get(context, 'result.data', [])
  //   const replies = await app.service('comments').find({
  //     query: {
  //       parent: {
  //         $in: ids
  //       }
  //     }
  //   })
  //
  //   context.replies = comments.concat(replies)
  //
  //   // set(context, 'result.replies', replies.concat(repliesRes.data))
  // }
}
