module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient')
  const { Schema } = mongooseClient
  const companies = new Schema(
    {
      name: {
        type: String,
        unique: true,
        required: true
      },

      slug: {
        type: String,
        unique: true,
        required: true
      },

      logo: { type: String },
      color: { type: String },
      slackIntegration: {
        type: Schema.Types.ObjectId,
        ref: 'slackIntegration',
      }
    },
    { timestamps: true }
  )

  return mongooseClient.model('companies', companies)
}
