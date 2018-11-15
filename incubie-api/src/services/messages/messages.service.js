const createService = require('./messages.class.js')
const hooks = require('./messages.hooks')
const Mailer = require('feathers-mailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = function (app) {
  const paginate = app.get('paginate')
  const config = app.get('authentication')

  const options = {
    name: 'messages',
    paginate
  }

  app.use(
    '/emails',
    Mailer(
      smtpTransport({
        service: 'gmail',
        auth: {
          user: config.google.email,
          pass: config.google.password
        }
      })
    )
  )

  const service = app.service('/emails')
  service.hooks(hooks)
}
