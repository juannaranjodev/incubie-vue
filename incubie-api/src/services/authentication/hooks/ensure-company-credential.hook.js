const { get, set } = require('lodash')
const entityKinds = require('../../credentials/entity-kinds')
const errors = require('@feathersjs/errors')

module.exports = (options = {}) => async function ensureCompanyCredentialHook (context) {
  const app = context.app
  const user = get(context, 'params.user')
  const slug = get(context, 'data.slug')

  let companyId = get(context.params.payload, 'companyId') || user.lastAccessed

  if (slug) {
    const companies = await app.service('companies').find({
      query: {
        slug,
        $select: ['_id'],
        $limit: 1
      },
      paginate: false
    })

    console.log('companies', companies)

    companyId = get(companies, '[0]._id')
  }

  if (companyId) {
    const { total } = await app.service('credentials').find({
      query: {
        entity: companyId,
        user: user._id,
        $limit: 0
      }
    })

    if (total === 0) {
      throw new errors.Forbidden({ errors: { company: 'User is not authorized to access this company.' } })
    }

    set(context, 'params.payload.companyId', companyId)
  }
}
