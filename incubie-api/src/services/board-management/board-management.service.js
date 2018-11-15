const boardManagement = require('./board-management')
const hooks = require('./board-management.hooks')

module.exports = function (app) {
  app.configure(boardManagement())

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('boardManagement')

  service.hooks(hooks)
}
