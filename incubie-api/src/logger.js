const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')
const fs = require('fs')
const logDir = 'logs'

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// Set this to whatever, by default the path of the script.
const isProd = process.env.NODE_ENV === 'production'

const opts = {
  datePattern: 'YYYY-MM-DD:HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
  dirname: 'logs'
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new DailyRotateFile({
      filename: 'errors-%DATE%.log',
      level: 'error',
      ...opts
    }),
    new DailyRotateFile({
      filename: 'combined-%DATE%.log',
      ...opts
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})

module.exports = logger
