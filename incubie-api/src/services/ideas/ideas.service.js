// Initializes the `ideas` service on path `/ideas`
const createService = require('feathers-mongoose')
const createModel = require('../../models/ideas.model')
const hooks = require('./ideas.hooks')


module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'ideas',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/ideas', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ideas')

  service.hooks(hooks)
}