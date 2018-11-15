module.exports = (options = {}) => async function acceptUserIdCredentialHook (context) {
  const { app, data } = context
  const { id } = data

  if (id) {
    const user = await app.service('users').get(id, {
      query: {
        $select: ['email']
      }
    })

    context.data.email = user.email
    context.data.id = null
  }
}
