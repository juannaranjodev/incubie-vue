const { authenticate } = require('@feathersjs/authentication').hooks
const { allowQueryEntityByUser } = require('../../hooks')
const entityKinds = require('../credentials/entity-kinds')
const search = require('../../hooks/search')


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      allowQueryEntityByUser({ kind: entityKinds.boards }),
      search({ fields: ['name'] })
    ],
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
