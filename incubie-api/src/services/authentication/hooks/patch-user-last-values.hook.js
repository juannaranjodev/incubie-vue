module.exports = (options = {}) => async function patchUserLastValuesHook (context) {
  const { app, params } = context
  const { user, payload } = params
  const { companyId } = payload
  const userId = user._id

  await app.service('users').patch(userId, {
    lastSeen: new Date(),
    lastAccessed: companyId
  })
}
