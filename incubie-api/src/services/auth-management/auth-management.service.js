const authManagement = require('feathers-authentication-management')
const hooks = require('./auth-management.hooks')
const notifier = require('./notifier')

module.exports = function () {
  const app = this

  app.configure(authManagement(notifier(app)))

  const service = app.service('authManagement')

  service.hooks(hooks)
}
