module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const commentVotes = new Schema({
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'comments',
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

  return mongooseClient.model('commentVotes', commentVotes)
}
