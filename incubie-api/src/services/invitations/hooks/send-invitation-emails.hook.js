const path = require('path')
const Handlebars = require('handlebars')
const fs = require('fs')

module.exports = (options = {}) => async function sendInvitationEmailsHook (context) {
  const { app, result } = context
  const templatePath = path.join(
    __dirname,
    '../../../../',
    'emails',
    'dist',
    'invitation.html'
  )
  const template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'))
  const from = app.get('emails').from.default
  const baseUrl = app.get('baseUrl')
  console.log("ruby: teset ***********--**********" , result);
  await Promise.all(result.map(async invitation => {
    const invitedBy = await app.service('users').get(invitation.invitedBy)
    const company = await app.service('companies').get(invitation.company)
    const to = invitation.email
    const subject = `${invitedBy.firstName} invited you to join ${company.name} on Incubie`

    const html = template({
      fromName: `${invitedBy.firstName} ${invitedBy.lastName}`,
      company: company.name,
      hashLink: `${baseUrl}/invitation/${invitation._id}`
    })

    const emailRes = await app.service('emails').create({
      from,
      to,
      subject,
      html
    })

    console.log(from)

    console.log(emailRes)
  }))
}
