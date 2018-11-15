const assert = require('assert');
const app = require('../../src/app');

describe('\'board-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('board-management');

    assert.ok(service, 'Registered the service');
  });
});
