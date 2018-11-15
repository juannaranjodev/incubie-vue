const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const { ensureCompanyUser } = require('../../hooks')
const ensureUniqueVote = require('./hooks/ensure-unique-vote.hook')
const syncVoteCounts = require('./hooks/sync-vote-counts.hook')

module.exports = {
  before: {
    all: [
      commonHooks.iff(commonHooks.isProvider('external'), [
        authenticate('jwt'),
        ensureCompanyUser()
      ])
    ],
    find: [],
    get: [],
    create: [
      ensureUniqueVote()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      syncVoteCounts()
    ],
    update: [],
    patch: [],
    remove: [
      syncVoteCounts()
    ]
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
