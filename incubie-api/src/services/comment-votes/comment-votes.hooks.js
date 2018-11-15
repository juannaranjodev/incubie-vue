const commonHooks = require('feathers-hooks-common')
const ensureUniqueCommentVote = require('./hooks/ensure-unique-comment-vote.hook')
const { updateCommentVoteCount } = require('../../hooks')

module.exports = {
  before: {
    all: [
      commonHooks.disallow('external')
    ],
    find: [],
    get: [],
    create: [ ensureUniqueCommentVote() ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      updateCommentVoteCount()
    ],
    update: [],
    patch: [],
    remove: [
      updateCommentVoteCount()
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
