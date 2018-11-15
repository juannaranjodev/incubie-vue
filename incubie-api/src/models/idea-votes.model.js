module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const ideaVotes = new Schema({
    idea: {
      type: Schema.Types.ObjectId,
      ref: 'ideas',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    createdAt: {
      type: Schema.Types.Date,
      default: new Date()
    }
  })

  return mongooseClient.model('ideaVotes', ideaVotes)
}
