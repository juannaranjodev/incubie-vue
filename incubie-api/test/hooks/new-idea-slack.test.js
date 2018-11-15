const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const newIdeaSlack = require('../../src/hooks/new-idea-slack');

describe('\'newIdeaSlack\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: newIdeaSlack()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
