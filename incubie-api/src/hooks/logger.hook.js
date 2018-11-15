// A hook that logs service method before, after and error
// See https://github.com/winstonjs/winston for documentation
// about the logger.
const logger = require('../logger')

logger.level = 'info'

module.exports = function () {
  return context => {
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`
    )

    if (typeof context.toJSON === 'function') {
      logger.debug('Hook Context', JSON.stringify(context, null, '  '))
    }

    if (context.error) {
      logger.error(context.error)
    }
  }
}
