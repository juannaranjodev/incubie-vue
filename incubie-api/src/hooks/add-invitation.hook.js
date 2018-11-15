const { checkContext } = require('feathers-hooks-common')
const { getLongToken } = require('../helpers')
const errors = require('@feathersjs/errors')

module.exports = (options = {}) => async hook => {
  checkContext(hook, 'before', ['create'])

  const { data, params } = hook
  const sender = params.user

  await Promise.all(data.map(async invitation => {
    const inviteToken = await getLongToken(15)
    invitation.invitedBy = sender._id
    invitation.inviteToken = inviteToken
    invitation.inviteExpires = Date.now() + (1000 * 60 * 60 * 24 * 5) // 5 days
  }))
}
