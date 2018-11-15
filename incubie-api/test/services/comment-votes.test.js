const assert = require('assert');
const app = require('../../src/app');

describe('\'commentVotes\' service', () => {
  it('registered the service', () => {
    const service = app.service('comment-votes');

    assert.ok(service, 'Registered the service');
  });
});
