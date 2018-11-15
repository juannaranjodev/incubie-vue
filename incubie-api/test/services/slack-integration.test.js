const assert = require('assert');
const app = require('../../src/app');

describe('\'slackIntegration\' service', () => {
  it('registered the service', () => {
    const service = app.service('slack-integration');

    assert.ok(service, 'Registered the service');
  });
});
