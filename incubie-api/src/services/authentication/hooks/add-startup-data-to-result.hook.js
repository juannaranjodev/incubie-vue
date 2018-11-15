const roleTypes = require('../../credentials/role-types')

module.exports = (options = {}) => async function addStartupDataToResultHook (context) {
  const { app, params } = context
  const companies = await app.service('companies').find({
    query: {
      user: params.user._id,
      $sort: {
        createdAt: 1
      }
    }
  })

  Object.assign(context.result, {
    companies,
    roleTypes
  })

  context.result.roleTypes = roleTypes
  context.result.permissions = await app.service('permissions').find()
  context.result.actionTypes = await app.service('actions').find()
}
