const { authenticate } = require('@feathersjs/authentication').hooks
const commonHooks = require('feathers-hooks-common')
const { ensureCompanyUser } = require('../../hooks')
const commentsResolvers = require('./comments.resolvers')
const syncIdeaCommentCount = require('./hooks/sync-idea-comment-count.hook')
// const findRepliesIfSet = require('./hooks/find-comment-replies-if-set.hook')
// const allowCommentsRepliesQuery = require('./hooks/allow-comments-replies-query.hook')
// const findCommentReplies = require('./hooks/find-comment-replies.hook')
const allowQueryCommentsByAllReplies = require('./hooks/allow-query-comments-by-all-replies.hook')
const flattenCommentReplies = require('./hooks/flatten-comment-replies.hook')

const newCommentSlack = require('../../hooks/slack/new-comment-slack');
const newCommentPushMessages = require("../../hooks/push-messages/new-comment-push-messages");

const search = require('../../hooks/search');
const sendNewCommentEmail = require('./hooks/send-new-comment-email.hook'); // ruby test


module.exports = {
  before: {
    all: [
      commonHooks.iff(commonHooks.isProvider('external'), [
        authenticate('jwt'),
        ensureCompanyUser()
      ])
    ],
    find: [
      allowQueryCommentsByAllReplies(),
      search({
        fields: ['text']
      })
    ],
    get: [
      allowQueryCommentsByAllReplies()
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      commonHooks.discard('__v')
    ],
    find: [
      commonHooks.fastJoin(commentsResolvers),
      flattenCommentReplies()
    ],
    get: [
      commonHooks.fastJoin(commentsResolvers),
      flattenCommentReplies()
    ],
    create: [
      commonHooks.fastJoin(commentsResolvers),
      // commonHooks.iff(commonHooks.isProvider('external'), [
      //   createCommentAuthorVote()
      // ])
      syncIdeaCommentCount(),
      newCommentSlack(),
      newCommentPushMessages(),
      sendNewCommentEmail(), // ruby test
    ],
    update: [],
    patch: [],
    remove: [
      syncIdeaCommentCount()
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
