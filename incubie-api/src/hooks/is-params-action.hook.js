const { get } = require('lodash')

module.exports = (options = {}) => async function isParamsAction (context) {
  return !!get(context, 'params.action')
}
