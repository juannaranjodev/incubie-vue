const { checkContext } = require('feathers-hooks-common')
const { boardRoles } = require('../../permissions/roles')

module.exports = (options = {}) => async function createCompanyUserHook (hook) {
  checkContext(hook, 'after', ['create', 'patch'])

  const { app, data, params, result } = hook
  const board = options.board || result._id
  const company = options.company || data.company
  const user = options.user || params.user._id
  const role = options.role || boardRoles.MEMBER
  const owner = options.owner || false

  await app.service('board-users').create({
    board,
    company,
    user,
    role,
    owner
  })
}
