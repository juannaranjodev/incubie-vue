// Initializes the `actions` service on path `/actions`
const createService = require('./actions.class.js')
const hooks = require('./actions.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate')

  const options = {
    name: 'actions',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/actions', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('actions')

  service.hooks(hooks)
}
