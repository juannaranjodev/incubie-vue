module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const comments = new Schema({
    text: {
      type: String,
      required: true
    },
    idea: {
      type: Schema.Types.ObjectId,
      ref: 'ideas',
      required: true
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'comments'
    },
    voteCount: {
      type: Number,
      default: 0
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  }, {
    timestamps: true
  })

  return mongooseClient.model('comments', comments)
}
