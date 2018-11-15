// Initializes the `credentials` service on path `/credentials`
const createService = require('feathers-mongoose')
const createModel = require('../../models/credentials.model')
const hooks = require('./credentials.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'credentials',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/credentials', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('credentials')

  service.hooks(hooks)
}
