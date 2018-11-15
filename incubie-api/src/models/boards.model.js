const { BadRequest } = require('@feathersjs/errors')

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const boards = new Schema({
    name: {
      type: String,
      required: true
    },
    description: { type: String },
    slug: {
      type: String,
      required: true
    },
    color: { type: String },
    image: { type: String },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'companies',
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    slackBoardId: { type: String, default:'#' }, // slack board id to post messages to,
    // ruby test added <
    hideVote: {
      type: Number,
      default: 0,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    messageOnCommentCreation: { type: Boolean, default: false },
    messageOnIdeaCreation: { type: Boolean, required: true, default: false, },
    messageOnIdeaStatusChanged: { type: Boolean, required: true, default: false, },
    messageOnJoinBoard: { type: Boolean, required: true, default: false, },
    // ruby test added >
  }, {
    timestamps: true
  })

  boards.pre('validate', async function (next) {
    const errors = {}
    const { total } = await app.service('boards').find({
      query: {
        name: this.name,
        company: this.company,
        $limit: 0
      }
    })

    if (total === 0) {
      return next()
    } else {
      errors.board = `A board with name '${this.name}' already exists`
      return next(new BadRequest({ errors }))
    }
  })

  return mongooseClient.model('boards', boards)
}
