const { checkContext } = require('feathers-hooks-common')
const get = require('lodash/get')
const set = require('lodash/set')

module.exports = (options = {}) => async function allowQueryEntityByUser (context) {
  checkContext(context, 'before', ['find'])

  const { app, params } = context
  const user = params.query.user

  if (user) {
    const userCredentials = await app.service('credentials').find({
      query: {
        user,
        kind: options.kind
      },
      paginate: false
    })

    const entityIds = userCredentials.map(userCredential => userCredential.entity)
    const $in = get(context.params.query, '_id.$in', [])
    set(context.params.query, '_id.$in', $in.concat(entityIds))

    delete params.query.user
  }
}
