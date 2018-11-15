const errors = require('@feathersjs/errors')
const permissions = require('../permissions')
const roleTypes = require('../../credentials/role-types')
const get = require('lodash/get')

function checkPermission (kind, role, type) {
  const allowedActions = get(permissions, `${kind}.${role}.allowedActions`, [])
  return allowedActions.indexOf(type) > -1
}

module.exports = (options = {}) => async function hasPermissionHook (context) {
  const { app, data } = context
  const { type, entity, user } = data
  const kind = type.split('/')[0]
  let role = user ? roleTypes.member : roleTypes.guest

  if (kind !== 'global' && user && entity) {
    const entityUsers = await app.service('credentials').find({
      query: {
        entity,
        user,
        $limit: 1
      },
      paginate: false
    })

    if (entityUsers.length) {
      role = entityUsers[0].role
    }
  }

  const hasPermission = kind === 'global' ? true : checkPermission(kind, role, type)

  if (hasPermission) {
    context.result = ''
  } else {
    throw new errors.Forbidden('User is not authorized to perform this action.')
  }
}
