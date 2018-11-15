// Initializes the `slackIntegration` service on path `/slack-integration`
const createService = require('feathers-mongoose');
const createModel = require('../../models/slack-integration.model');
const hooks = require('./slack-integration.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/slack-integration', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('slack-integration');

  service.hooks(hooks);
};
