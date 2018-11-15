const assert = require('assert');
const app = require('../../src/app');

describe('\'company-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('company-management');

    assert.ok(service, 'Registered the service');
  });
});
