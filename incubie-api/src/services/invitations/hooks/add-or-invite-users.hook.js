const errors = require('@feathersjs/errors')
const rolesTypes = require('../../credentials/role-types')
const entityKinds = require('../../credentials/entity-kinds')

module.exports = (options = {}) => async hook => {
  const { app, data } = hook
  const Users = app.service('users')

  await Promise.all(data.map(async invitation => {
    const userResult = await Users.find({
      query: {
        email: invitation.email,
        $limit: 1
      }
    })

    if (userResult.total) {
      try {
        await app.service('credentials').create({
          user: userResult.data[0],
          entity: invitation.company,
          kind: entityKinds.companies,
          role: rolesTypes.member,
          owner: false
        })
      } catch (err) {
        throw new errors.BadRequest('Could not add user to company.')
      }
    } else {
      console.log('***** INVITE USER')
      console.log(invitation)
      console.log('***** END INVITE USER')
    }
  }))

  hook.result = ''
}
