const roleTypes = require('../services/credentials/role-types')
const entityKinds = require('../services/credentials/entity-kinds')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const invitations = new Schema({
    email: {
      type: String,
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
      refPath: 'companies',
      required: true
    },
    role: {
      type: String,
      enum: Object.keys(roleTypes).map(role => roleTypes[role]),
      required: true
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      refPath: 'users',
      required: true
    }
  }, {
    timestamps: true
  })

  return mongooseClient.model('invitations', invitations)
}
