const statusTypes = require('../services/ideas/idea-status-types')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient

  const ideas = new Schema({
    title: {
      type: String,
      required: true
    },
    userStory: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'companies',
      required: true
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: 'boards',
      required: true
    },
    thumb: {type: String},
    images: {
      type: Array,
      default: []
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    status: {
      type: String,
      required: true,
      default: statusTypes.proposed,
      enum: Object.keys(statusTypes).map(type => statusTypes[type])
    },
    statusDescription: {
      type: String,
      required: false
    },
    statusUrl: {
      type: String,
      required: false
    },
    voteCount: {
      type: Number,
      default: 0
    },
    commentCount: {
      type: Number,
      default: 0
    },
    // ruby test <
    check: {
      type: Number,
      default: 0
    },
    // ruby test >
    // ruby test: messageOnCommentCreation: { type: Boolean, default: false }
  }, {
    timestamps: true
  })

  return mongooseClient.model('ideas', ideas)
}
