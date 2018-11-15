module.exports = (options = {}) => async function updateIdeaVoteCountHook (context) {
  const { app, result } = context
  const ideaId = result.idea
  const { total } = await app.service('idea-votes').find({
    query: {
      idea: ideaId,
      $limit: 0
    }
  })

  await app.service('ideas').patch(ideaId, {
    voteCount: total
  })
}
