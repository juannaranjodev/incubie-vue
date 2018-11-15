const roleTypes = require('../services/credentials/role-types')
const entityKinds = require('../services/credentials/entity-kinds')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const credentials = new Schema({
    entity: {
      type: Schema.Types.ObjectId,
      refPath: 'kind',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    kind: {
      type: String,
      required: true,
      enum: Object.keys(entityKinds).map(kind => entityKinds[kind])
    },
    role: {
      type: String,
      enum: Object.keys(roleTypes).map(role => roleTypes[role]),
      required: true
    },
    active: {
      type: Boolean,
      default: true
    },
    lastSeenAt: {
      type: Date,
      default: new Date()
    }
  }, {
    timestamps: true
  })

  return mongooseClient.model('credentials', credentials)
}
