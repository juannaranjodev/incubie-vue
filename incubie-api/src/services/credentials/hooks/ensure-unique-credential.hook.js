const errors = require('@feathersjs/errors')

module.exports = (options = {}) => async function ensureUniqueCredentialHook (context) {
  const { app, data } = context
  const { entity, user } = data

  const { total } = await app.service('credentials').find({
    query: {
      entity,
      user,
      $limit: 0
    }
  })

  if (total > 0) {
    throw new errors.BadRequest({ errors: { boards: 'User already belongs to this board.' } })
  }
}
