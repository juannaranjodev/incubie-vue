const crypto = require('crypto')

module.exports = (options = {}) => async function addInvitationTokenHook (context) {
  context.data.forEach(invitation => {
    invitation.inviteToken = crypto.randomBytes(14).toString('hex')
  })
}
