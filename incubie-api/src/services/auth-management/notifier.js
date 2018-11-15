const logger = require('../../logger')
const isProd = process.env.NODE_ENV === 'production'
const path = require('path')
const Handlebars = require('handlebars')
const fs = require('fs')

module.exports = function (app) {
  const config = app.get('authentication')
  const fromEmail = config.google.email
  const returnEmail = config.google.email

  function getLink (type, hash) {
    const baseUrl = app.get('baseUrl')
    return `${baseUrl}/account/${type}/${hash}`
  }

  async function sendEmail (email) {
    try {
      const result = await app.service('emails').create(email)
      logger.info('Sent email', result)
    } catch (err) {
      logger.error('Error sending email', err)
    }
  }

  return {
    notifier: function (type, user, notifierOptions) {
      console.log(`-- Preparing email for ${type}`)
      let hashLink
      let email
      let emailAccountTemplatesPath = path.join(
        __dirname,
        '../../../',
        'emails',
        'dist'
      )
      let templatePath
      let template
      let compiledHTML

      switch (type) {
        case 'resendVerifySignup': // send another email with link for verifying user's email address
          hashLink = getLink('verify', user.verifyToken)
          templatePath = path.join(
            emailAccountTemplatesPath,
            'verify-email.html'
          )
          template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'))
          compiledHTML = template({
            hashLink
          })
          email = {
            from: fromEmail,
            to: user.email,
            subject: `Confirm ${user.email} on Incubie`,
            html: compiledHTML
          }
          return sendEmail(email)
          break
        case 'verifySignup': // inform that user's email is now confirmed
          hashLink = getLink('verify', user.verifyToken)
          // templatePath = path.join(
          //   emailAccountTemplatesPath,
          //   'email-verified.jade'
          // )
          // compiledHTML = jade.compileFile(templatePath)({
          //   logo: '',
          //   name: user.name || user.email,
          //   hashLink,
          //   returnEmail
          // })
          compiledHTML = 'verifySignup'
          email = {
            from: fromEmail,
            to: user.email,
            subject: 'Thank you, your email has been verified',
            html: compiledHTML
          }
          return sendEmail(email)
          break
        case 'sendResetPwd': // inform that user's email is now confirmed
          hashLink = getLink('reset', user.resetToken)
          // templatePath = path.join(
          //   emailAccountTemplatesPath,
          //   'reset-password.jade'
          // )
          // compiledHTML = jade.compileFile(templatePath)({
          //   logo: '',
          //   name: user.name || user.email,
          //   hashLink,
          //   returnEmail
          // })
          compiledHTML = 'sendResetPwd'
          email = {
            from: fromEmail,
            to: user.email,
            subject: 'Reset Password',
            html: compiledHTML
          }
          return sendEmail(email)
          break
        case 'resetPwd': // inform that user's email is now confirmed
          hashLink = getLink('reset', user.resetToken)
          // templatePath = path.join(
          //   emailAccountTemplatesPath,
          //   'password-was-reset.jade'
          // )
          // compiledHTML = jade.compileFile(templatePath)({
          //   logo: '',
          //   name: user.name || user.email,
          //   hashLink,
          //   returnEmail
          // })
          compiledHTML = 'resetPwd'
          email = {
            from: fromEmail,
            to: user.email,
            subject: 'Your password was reset',
            html: compiledHTML
          }
          return sendEmail(email)
          break
        case 'passwordChange':
          // templatePath = path.join(
          //   emailAccountTemplatesPath,
          //   'password-change.jade'
          // )
          // compiledHTML = jade.compileFile(templatePath)({
          //   logo: '',
          //   name: user.name || user.email,
          //   returnEmail
          // })
          compiledHTML = 'passwordChange'
          email = {
            from: fromEmail,
            to: user.email,
            subject: 'Your password was changed',
            html: compiledHTML
          }
          return sendEmail(email)
          break
        case 'identityChange':
          hashLink = getLink('verifyChanges', user.verifyToken)
          // templatePath = path.join(
          //   emailAccountTemplatesPath,
          //   'identity-change.jade'
          // )
          // compiledHTML = jade.compileFile(templatePath)({
          //   logo: '',
          //   name: user.name || user.email,
          //   hashLink,
          //   returnEmail,
          //   changes: user.verifyChanges
          // })
          compiledHTML = 'identityChange'
          email = {
            from: fromEmail,
            to: user.email,
            subject: 'Your account was changed. Please verify the changes',
            html: compiledHTML
          }
          return sendEmail(email)
          break
        default:
          break
      }
    }
  }
}
