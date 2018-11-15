const actions = require('./services/actions/action-types')
const get = require('lodash/get')

module.exports = function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection)
  })

  app.on('login', (authResult, data) => {
    const { connection } = data

    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection)
    }
  })

  app.service('actions').publish((res, context) => {
    const company = get(res, 'company')

    return [
      company ? app.channel(`companies/${company}`) : null
    ]
  })
}
