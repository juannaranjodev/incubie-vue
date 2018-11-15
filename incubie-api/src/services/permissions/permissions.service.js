const createService = require('./permissions.class.js')
const hooks = require('./permissions.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'permissions',
    paginate
  }

  app.use('/permissions', createService(options))

  const service = app.service('permissions')

  service.hooks(hooks)
}
