const authentication = require('@feathersjs/authentication')
const jwt = require('@feathersjs/authentication-jwt')
const local = require('@feathersjs/authentication-local')
const oauth2 = require('@feathersjs/authentication-oauth2')
const GoogleStrategy = require('passport-google-oauth20')
const errors = require('@feathersjs/errors')
const hooks = require('./authentication.hooks')

class CustomVerifier extends jwt.Verifier {
  async verify (req, payload, done) {
    // ensure the user exists
    // console.log(payload)
    try {
      const user = await this.app.service('users').get(payload.userId)

      done(null, user, payload)
    } catch (err) {
      done(new errors.NotAuthenticated({
        errors: {
          user: 'User not found.'
        }
      }))
    }
  }
}

module.exports = function (app) {
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(jwt({ Verifier: CustomVerifier, passReqToCallback: true }))
  app.configure(local())

  app.configure(
    oauth2(
      Object.assign(
        {
          name: 'google',
          Strategy: GoogleStrategy
        },
        config.google
      )
    )
  )

  app.service('authentication').hooks(hooks(app))
}
