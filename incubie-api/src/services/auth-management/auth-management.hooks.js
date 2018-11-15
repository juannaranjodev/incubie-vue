const hooks = require('feathers-hooks-common')
const auth = require('@feathersjs/authentication')
const { isAction } = require('../../hooks')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      hooks.iff(
        isAction('passwordChange', 'identityChange'),
        auth.hooks.authenticate('jwt')
      )
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
