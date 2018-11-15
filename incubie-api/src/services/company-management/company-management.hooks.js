const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const { isAction } = require('../../hooks')

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      commonHooks.iff(commonHooks.isNot(isAction('validateCompany')), authenticate('jwt'))
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
