const hooks = require('./emails.hooks')
const Mailer = require('feathers-mailer')
const smtpTransport = require('nodemailer-smtp-transport')

module.exports = function () {
  const app = this
  const config = app.get('authentication')

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

  const service = app.service('emails')

  service.hooks(hooks)
}
