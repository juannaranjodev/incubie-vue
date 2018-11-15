const errors = require('@feathersjs/errors')
const { get } = require('lodash')

module.exports = (options = {}) => async function ensureCompanyUser (context) {
  const { app, params } = context
  const user = get(params, 'user._id')
  const company = get(params, 'query.company') || params.company || get(params, 'payload.companyId')

  if (!user) {
    throw new errors.Forbidden()
  }

  if (!company) {
    throw new errors.BadRequest({
      errors: {
        company: 'Company is required.'
      }
    })
  }

  const credential = await app.service('credentials').find({
    query: {
      entity: company,
      user,
      $limit: 0
    }
  })

  if (credential.total === 0) {
    throw new errors.Forbidden()
  }
}
