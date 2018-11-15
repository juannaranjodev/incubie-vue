const assert = require('assert');
const app = require('../../src/app');

describe('\'entity-users\' service', () => {
  it('registered the service', () => {
    const service = app.service('entity-users');

    assert.ok(service, 'Registered the service');
  });
});
