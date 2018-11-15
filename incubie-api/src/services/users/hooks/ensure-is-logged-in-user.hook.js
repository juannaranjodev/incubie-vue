const errors = require('@feathersjs/errors')
const { get } = require('lodash')

module.exports = (options = {}) => async function ensureIsLoggedInUser (context) {
  const user = get(context, 'params.user._id')

  if (!user.equals(context.id)) {
    throw new errors.Forbidden({ errors: { company: 'User is not authorized to perform this action.' } })
  }
}
