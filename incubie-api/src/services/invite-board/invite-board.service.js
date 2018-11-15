// Initializes the `invite-board` service on path `/invite-board`
const createService = require('feathers-mongoose')
const createModel = require('../../models/invite-board.model')
const hooks = require('./invite-board.hooks');


module.exports = function (app) {
  const Model = createModel(app)
  const paginate = app.get('paginate');

  const options = {
    name: 'invite-board',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/invite-board', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('invite-board');

  service.hooks(hooks);
};
