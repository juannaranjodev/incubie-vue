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
  let invitation = null;
    
    await Promise.all(result.map(async invitation => {
      const invitedBy = await app.service('users').get(invitation.invitedBy)
      const company = await app.service('companies').get(invitedBy.lastAccessed);
      const board = await app.service('boards').get(invitation.board)
      const to = invitation.email
      const subject = `${invitedBy.firstName} invited you to join a new board`
      let sharelink = "invitation/" + company._id + '_FAI35_' + invitation.invitedBy + '_FAI35_' + invitation.board + '_FAI35_' + company.name.split(' ').join('_');
      const html = template({
        fromName: `${invitedBy.firstName} ${invitedBy.lastName}`,
        company: "a new board",
        hashLink: `${baseUrl}/` + sharelink,
        
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
