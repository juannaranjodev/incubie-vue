const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const {
  addRandomColor
} = require('../../hooks')
const { allowQueryEntityByUser } = require('../../hooks')
const entityKinds = require('../credentials/entity-kinds')
const { ensureCompanyUser } = require('../../hooks')
const companiesResolvers = require('./companies.resolvers')

module.exports = {
  before: {
    all: [
      commonHooks.iff(commonHooks.isProvider('external'), [
        authenticate('jwt'),
        ensureCompanyUser()
      ])
    ],
    find: [
      allowQueryEntityByUser({ kind: entityKinds.companies })
    ],
    get: [],
    create: [
      addRandomColor()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      commonHooks.fastJoin(companiesResolvers)
    ],
    get: [
      commonHooks.fastJoin(companiesResolvers)
    ],
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
