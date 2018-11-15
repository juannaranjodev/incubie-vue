// Initializes the `ideaVotes` service on path `/idea-votes`
const createService = require('feathers-mongoose')
const createModel = require('../../models/idea-votes.model')
const hooks = require('./idea-votes.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'idea-votes',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/idea-votes', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('idea-votes')

  service.hooks(hooks)
}
