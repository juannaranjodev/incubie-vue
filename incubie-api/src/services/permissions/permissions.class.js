const errors = require('@feathersjs/errors')
const get = require('lodash/get')
const roleTypes = require('../credentials/role-types')
const permissions = require('./permissions')

class Service {
  constructor (options) {
    this.options = options || {}
  }

  setup (app) {
    this.app = app
  }

  async find (params) {
    return permissions
  }

  async get (id, params) {
    return {}
  }

  async create (data, params) {
    const { type, entity, user } = data
    const kind = type.split('/')[0]
    let role = roleTypes.guest

    if (kind === 'global') {
      return true
    }

    if (user && entity) {
      const entityUsers = await this.app.service('credentials').find({
        query: {
          entity,
          user,
          $limit: 1
        },
        paginate: false
      })

      if (entityUsers.length) {
        role = entityUsers[0].role
      }
    }

    const hasPermission = this.checkPermission(kind, role, type)

    if (hasPermission) {
      return true
    } else {
      throw new errors.Forbidden('User is not authorized to perform this action.')
    }
  }

  async update (id, data, params) {
    return data
  }

  async patch (id, data, params) {
    return data
  }

  async remove (id, params) {
    return { id }
  }

  checkPermission (kind, role, type) {
    const allowedActions = get(permissions, `${kind}.${role}.allowedActions`, [])
    return allowedActions.indexOf(type) > -1
  }
}

module.exports = function (options) {
  return new Service(options)
}

module.exports.Service = Service
