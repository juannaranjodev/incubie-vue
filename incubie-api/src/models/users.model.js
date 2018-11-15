const uniqueValidator = require('mongoose-unique-validator')
const secrets = require('../config/secretes')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const users = new mongooseClient.Schema(
    {
      email: {
        type: String,
        unique: true,
        required: [true, 'Email cannot be left blank']
      },
      password: { type: String },

      firstName: {
        type: String,
        required: [true, 'Name cannot be left blank']
      },
      lastName: { type: String },

      avatar: { type: String },

      voteCount: {
        type: Number,
        default: 0
      },

      googleId: { type: String },
      linkedInId: { type: String },

      isVerified: { type: Boolean },
      verifyToken: { type: String },
      verifyExpires: { type: Date },
      verifyChanges: { type: Object },
      resetToken: { type: String },
      resetExpires: { type: Date },

      lastSeen: {
        type: Schema.Types.Date
      },
      lastAccessed: {
        type: Schema.Types.ObjectId,
        refPath: 'companies'
      },
      // <
      notificationsTokens: {
        type: [String]
      },
      // >
      // ray test added for stripe management <
      stripe: {
        customerId: {
          type: String,
          default: ''
        },
        subscriptionId: {
          type: String,
          default: ''
        },
        plan: {
          type: String,
          default: secrets.stripeOptions.defaultPlan
        }
      }
      // ray test added >
    },
    { timestamps: true }
  )

  users
    .virtual('fullName')
    .get(function () {
      return `${this.firstName} ${this.lastName}`
    })
    .set(function (value) {
      const spaceAt = value.indexOf(' ')

      if (spaceAt === -1) {
        this.firstName = value
      } else {
        this.firstName = value.substr(0, spaceAt)
        this.lastName = value.substr(spaceAt + 1)
      }
    })

  users.plugin(uniqueValidator)
  return mongooseClient.model('users', users)
}
