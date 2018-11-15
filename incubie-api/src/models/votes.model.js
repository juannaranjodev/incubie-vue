const voteKinds = require('../services/votes/vote-kinds')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const votes = new Schema({
    parent: {
      type: Schema.Types.ObjectId,
      refPath: 'kind',
      required: true
    },
    kind: {
      type: String,
      required: true,
      enum: Object.keys(voteKinds).map(kind => voteKinds[kind]),
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    voter: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    createdAt: {
      type: Schema.Types.Date,
      default: new Date()
    }
  })

  return mongooseClient.model('votes', votes)
}
