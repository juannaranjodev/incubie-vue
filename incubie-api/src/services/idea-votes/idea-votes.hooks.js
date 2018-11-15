const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const { ensureCompanyUser } = require('../../hooks')
const ensureUniqueIdeaVote = require('./hooks/ensure-unique-idea-vote.hook')
const { updateIdeaVoteCount } = require('../../hooks')

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
      ensureUniqueIdeaVote()
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
      updateIdeaVoteCount()
    ],
    update: [],
    patch: [],
    remove: [
      updateIdeaVoteCount()
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
