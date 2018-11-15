/* eslint-disable no-console */
require('dotenv').config()
const logger = require('./logger')
const app = require('./app')
const port = process.env.PORT || app.get('port')
const server = app.listen(port)

process.on('unhandledRejection',
  (reason, p) => {
    console.log(p)
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  }
)

server.on('listening', () => {
  logger.info(`Feathers application started on http://${app.get('host')}:${port}`)
})
