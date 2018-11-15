const commonHooks = require('feathers-hooks-common')
const { authenticate } = require('@feathersjs/authentication').hooks
const allowQueryCredentialsByCompany = require('./hooks/allow-query-credentials-by-company.hook')
const ensureUniqueCredential = require('./hooks/ensure-unique-credential.hook')
const joinBoardSlack = require('../../hooks/slack/join-board-slack') // ruby test for slack integration

module.exports = {
  before: {
    all: [
      commonHooks.unless(commonHooks.isProvider('server'),
        authenticate('jwt')
      )
    ],
    find: [
      allowQueryCredentialsByCompany()
    ],
    get: [],
    create: [
      ensureUniqueCredential()
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
      //ruby test:
      joinBoardSlack(),
    ],
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
