const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const isGlobalAction = require('./hooks/is-global-action.hook')

module.exports = {
  before: {
    all: [
      commonHooks.unless(isGlobalAction(),
        authenticate('jwt')
      )
    ],
    find: [],
    get: [],
    create: [],
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
