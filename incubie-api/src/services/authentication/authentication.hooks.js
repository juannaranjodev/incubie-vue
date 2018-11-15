const { authenticate } = require('@feathersjs/authentication').hooks
const addStartupDataToResult = require('./hooks/add-startup-data-to-result.hook')
const addCompanyToPayload = require('./hooks/add-company-to-payload.hook')
const patchUserLastValues = require('./hooks/patch-user-last-values.hook')
const acceptUserIdCredential = require('./hooks/accept-user-id-credential.hook')
const ensureCompanyCredential = require('./hooks/ensure-company-credential.hook')

module.exports = app => {
  const config = app.get('authentication')

  return {
    before: {
      all: [],
      find: [],
      get: [],
      create: [
        acceptUserIdCredential(),
        authenticate(config.strategies),
        ensureCompanyCredential(),
        addCompanyToPayload()
      ],
      update: [],
      patch: [],
      remove: [
        authenticate('jwt')
      ]
    },

    after: {
      all: [],
      find: [],
      get: [],
      create: [
        patchUserLastValues(),
        addStartupDataToResult()
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
}
