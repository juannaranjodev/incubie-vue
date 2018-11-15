const companyManagement = require('./company-management')
const hooks = require('./company-management.hooks')

module.exports = function (app) {
  app.configure(companyManagement())

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('companyManagement')

  service.hooks(hooks)
}
