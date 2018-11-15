const errors = require('@feathersjs/errors')
const get = require('lodash/get')

module.exports = (...args) => async function isGlobalActionHook (context) {
  const type = get(context, 'data.type', '')
  const kind = type.split('/')[0]

  return kind === 'global'
}
