module.exports = (options = {}) => async function updateCommentVoteCountHook (context) {
  const { app, result } = context
  const commentId = result.comment
  const { total } = await app.service('comment-votes').find({
    query: {
      comment: commentId,
      $limit: 0
    }
  })

  await app.service('comments').patch(commentId, {
    voteCount: total
  })
}
