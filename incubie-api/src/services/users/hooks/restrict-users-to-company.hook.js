const { checkContext } = require('feathers-hooks-common')
const errors = require('@feathersjs/errors')
const get = require('lodash/get')
const set = require('lodash/set')

module.exports = (options = {}) => async function restrictUsersToCompany (context) {
  checkContext(context, 'before', ['find'])

  const { app, params } = context
  const company = params.query.company

  if (!company) {
    throw new errors.BadRequest('You must specify a company.')
  }

  const credentials = await app.service('credentials').find({
    query: {
      entity: company,
      $select: ['user']
    },
    paginate: false
  })
  const userIds = credentials.map(credential => credential.user)
  const $in = get(context.params.query, '_id.$in', [])

  set(context.params.query, '_id.$in', $in.concat(userIds))
  delete context.params.query.company
}
