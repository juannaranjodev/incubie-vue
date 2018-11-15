const errors = require('@feathersjs/errors')

module.exports = (options = {}) => async function ensureUniqueVoteHook (context) {
  const { data, service } = context

  const { total } = await service.find({
    query: {
      ...data,
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
