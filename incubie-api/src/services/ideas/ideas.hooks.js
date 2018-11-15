const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const { ensureCompanyUser } = require('../../hooks')
const ideasResolvers = require('./ideas.resolvers')
const ensureIdeaOwnerOrAdmin = require('./hooks/ensure-idea-owner-or-admin.hook')

const newIdeaSlack = require('../../hooks/slack/new-idea-slack')

const search = require('./../../hooks/search')
const ideaStatusChangePushMessages = require("./../../hooks/push-messages/idea-status-change-push-messages.hook");
const ideaCreatePushMessages = require("./../../hooks/push-messages/idea-create-push-messages.hook");

const ideaStatusSlack = require('../../hooks/slack/idea-status-slack')


module.exports = {
  before: {
    all: [
      commonHooks.iff(commonHooks.isProvider('external'), [
        authenticate('jwt'),
        ensureCompanyUser()
      ])
    ],
    find: [
      search({
        "fields": ["title", "description"]
      })
    ],
    get: [],
    create: [

    ],
    update: [],
    patch: [
      commonHooks.iff(commonHooks.isProvider('external'), [
        ensureIdeaOwnerOrAdmin()
      ]),
      ideaStatusChangePushMessages()
    ],
    remove: []
  },

  after: {
    all: [],
    find: [
      commonHooks.fastJoin(ideasResolvers)
    ],
    get: [
      commonHooks.fastJoin(ideasResolvers)
    ],
    create: [
      // autoVoteForIdea(),
      commonHooks.fastJoin(ideasResolvers),
      newIdeaSlack(),
      ideaCreatePushMessages()
    ],
    update: [],
    patch: [
      // ruby test;
      ideaStatusSlack(),
    ],
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
