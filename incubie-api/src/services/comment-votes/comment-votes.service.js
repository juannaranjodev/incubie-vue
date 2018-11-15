// Initializes the `commentVotes` service on path `/comment-votes`
const createService = require('feathers-mongoose')
const createModel = require('../../models/comment-votes.model')
const hooks = require('./comment-votes.hooks')

module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'comment-votes',
    Model,
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/comment-votes', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('comment-votes')

  service.hooks(hooks)
}
