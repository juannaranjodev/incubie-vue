const errors = require('@feathersjs/errors')
const { get } = require('lodash')
const roleTypes = require('../../credentials/role-types')

module.exports = (options = {}) => async function ensureIdeaOwnerOrAdmin (context) {
  const app = context.app
  const user = get(context, 'params.user._id')
  const idea = await app.service('ideas').get(context.id)
  let authorized = false
  //console.log("ruby:^^^^^^^^^^idea.createdBy", idea.createdBy, "  user = ",user );
  if (idea.createdBy.equals(user)) { // ruby test: origin: equals(user + 1)
    authorized = true
  } else {
    const { total } = await app.service('credentials').find({
      query: {
        role: roleTypes.admin,
        user,
        $or: [
          {
            entity: idea.board
          },
          {
            entity: idea.company
          }
        ],
        $limit: 0
      }
    })

    authorized = total > 0
  }

  if (!authorized) {
    throw new errors.Forbidden({ errors: { company: 'User is not authorized to perform this action.' } })
  }
}
