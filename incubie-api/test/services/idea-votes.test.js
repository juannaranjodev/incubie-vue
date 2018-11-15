const assert = require('assert');
const app = require('../../src/app');

describe('\'ideaVotes\' service', () => {
  it('registered the service', () => {
    const service = app.service('idea-votes');

    assert.ok(service, 'Registered the service');
  });
});
