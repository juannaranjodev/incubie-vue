const errors = require('@feathersjs/errors')

module.exports = (options = {}) => async function ensureUniqueIdeaVoteHook (context) {
  const { data, service } = context
  const { company, idea, user } = data

  const { total } = await service.find({
    query: {
      company,
      idea,
      user,
      $limit: 0
    }
  })

  if (total > 0) {
    throw new errors.BadRequest('Only one vote is allowed per user.', {
      errors: {
        vote: 'You have already voted.'
      }
    })
  }
}
