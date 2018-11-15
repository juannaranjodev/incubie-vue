const { checkContext } = require('feathers-hooks-common')
const entityKinds = require('../../credentials/entity-kinds')

module.exports = (options = {}) => async function queryCompaniesWithCurrentUser (context) {
  checkContext(context, 'before', ['find'])

  const { app, params } = context
  const user = params.user

  if (user) {
    const companyUsers = await app.service('credentials').find({
      query: {
        user: user._id,
        kind: entityKinds.companies,
        $select: ['entity']
      },
      paginate: false
    })

    context.params.query._id = {
      $in: companyUsers.map(companyUser => {
        return companyUser.entity
      })
    }
  }
}
