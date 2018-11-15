module.exports = (options = {}) => async function restrictToPublicUserProfileHook (context) {
  const { app, id } = context
  context.result = await app.service('users').get(id, {
    query: {
      $select: ['firstName', 'lastName', 'avatar']
    }
  })
}
