const mongoose = require('mongoose')
const logger = require('./logger')

module.exports = function (app) {
  mongoose.connect(process.env.MONGODB_URI || app.get('mongodb'), {}, (err, db) => {
    if (err) {
      logger.error('database connection error!')
      logger.error(err)
    } else {
      logger.info('database connection successful')
    }
  })
  mongoose.Promise = global.Promise

  app.set('mongooseClient', mongoose)
}
