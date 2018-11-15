const { authenticate } = require('@feathersjs/authentication').hooks
const sendInvitationEmails = require('./hooks/send-invitation-emails.hook')
const addInviteToken = require('./hooks/add-invite-token.hook')
const commonHooks = require('feathers-hooks-common')
const get = require('lodash/get')

module.exports = {
  before: {
    all: [
      commonHooks.disallow('external')
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
    get: [
      commonHooks.fastJoin({
        joins: {
          company: (...args) => async (invitation, context) => {
            const { app } = context
            invitation.company = await app.service('companies').get(invitation.company, {
              query: {
                $select: ['name', 'slug']
              }
            })
          },
          invitedBy: (...args) => async (invitation, context) => {
            const { app } = context
            invitation.invitedBy = await app.service('users').get(invitation.invitedBy, {
              query: {
                $select: ['firstName', 'lastName']
              }
            })
          },
          user: (...args) => async (invitation, context) => {
            const { app } = context
            const users = await app.service('users').find({
              query: {
                email: invitation.email,
                $limit: 1,
                $select: ['firstName', 'lastName', 'email']
              },
              paginate: false
            })

            invitation.user = get(users, '[0]')
          }
        }
      })
    ],
    create: [
      sendInvitationEmails()
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
