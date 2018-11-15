const voteKinds = require('../vote-kinds')

module.exports = (options = {}) => async function syncVoteCountsHook (context) {
  const { app, result } = context
  const Votes = app.service('votes')

  const { parent, kind, owner } = result
  const Entity = app.service(kind)
  const Users = app.service('users')
  const entityRes = await Votes.find({
    query: {
      parent,
      $limit: 0
    }
  })
  const ownerRes = await Votes.find({
    query: {
      owner,
      $limit: 0
    }
  })

  await Entity.patch(parent, {
    voteCount: entityRes.total
  })

  await Users.patch(owner, {
    voteCount: ownerRes.total
  })
}
