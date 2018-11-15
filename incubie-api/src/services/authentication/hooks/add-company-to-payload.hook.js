const { get, set } = require('lodash')
const entityKinds = require('../../credentials/entity-kinds')
const errors = require('@feathersjs/errors')

module.exports = (options = {}) => async function addCompanyToPayloadHook (context) {
  const { app, data, params } = context
  const { user } = params
  const userId = user._id
  const { slug } = data
  let companyId = get(params.payload, 'companyId') || user.lastAccessed

  if (slug) {
    const foundCompanies = await app.service('companies').find({
      query: {
        slug,
        $limit: 1
      },
      paginate: false
    })

    companyId = get(foundCompanies, '[0]._id')
  }

  const companyCredentialsRes = await app.service('credentials').find({
    query: {
      kind: entityKinds.companies,
      user: userId,
      $select: ['entity'],
      $sort: {
        createdAt: -1
      }
    }
  })
  const companyCredentials = companyCredentialsRes.data

  if (companyId) {
    const hasCredential = companyCredentials.find(companyCredential => companyCredential.entity.equals(companyId))

    if (!hasCredential) {
      throw new errors.Forbidden({ errors: { company: 'User is not authorized to view this company.' } })
    }
  }
}
