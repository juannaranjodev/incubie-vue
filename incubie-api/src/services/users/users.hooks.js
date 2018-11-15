const { authenticate } = require('@feathersjs/authentication').hooks
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks
const sendVerificationEmail = require('../../hooks/send-verification-email')
const verifyHooks = require('feathers-authentication-management').hooks
const commonHooks = require('feathers-hooks-common')
const allowQueryUsersByCompany = require('./hooks/allow-query-users-by-company.hook')
const { paramsFromClient } = require('feathers-hooks-common')
const { isParamsAction } = require('../../hooks')
const restrictToPublicUserProfile = require('./hooks/restrict-to-public-user-profile.hook')
const usersResolvers = require('./users.resolvers')
const ensureIsLoggedInUser = require('./hooks/ensure-is-logged-in-user.hook')
const search = require('../../hooks/search')


module.exports = {
  before: {
    all: [],
    find: [
      commonHooks.unless(commonHooks.isProvider('server'),
        authenticate('jwt')
      ),
      allowQueryUsersByCompany(),
      search({ fields: ['lastName', 'firstName', 'email'] })
    ],
    get: [
      paramsFromClient('action'),
      commonHooks.iff(
        isParamsAction('getPublicProfile'),
        restrictToPublicUserProfile()
      ).else(authenticate('jwt'))
    ],
    create: [
      hashPassword(),
      verifyHooks.addVerification()
    ],
    update: [
      commonHooks.disallow('external'),
      hashPassword(),
      authenticate('jwt')
    ],
    patch: [
      hashPassword(),
      authenticate('jwt'),
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(
          true,
          'isVerified.verifyToken.verifyShortToken.verifyExpires.verifyChanges.resetToken.resetShortToken.resetExpires'
        ),
        ensureIsLoggedInUser()
      )
    ],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [
      protect('password', '__v', 'verifyToken', 'verifyExpires')
    ],
    find: [
      commonHooks.fastJoin(usersResolvers)
    ],
    get: [
      commonHooks.fastJoin(usersResolvers)
    ],
    create: [
      commonHooks.iff(commonHooks.isProvider('external'),
        sendVerificationEmail()
      ),
      verifyHooks.removeVerification()
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
