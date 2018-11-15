// slackIntegration-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const slackIntegration = new Schema({
    company: {
      type: Schema.Types.ObjectId,
      ref: 'companies',
      required: true
    },
    apiToken: { type: String, required: true },
    //ruby test: messageOnIdeaCreation: { type: Boolean, required: true, default: false, }
  }, {
    timestamps: true
  });

  return mongooseClient.model('slackIntegration', slackIntegration);
};
