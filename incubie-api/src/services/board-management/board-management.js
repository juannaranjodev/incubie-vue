const errors = require('@feathersjs/errors')
const debug = require('debug')('companyManagement:main')
const { BadRequest } = require('@feathersjs/errors')

const optionsDefault = {
  app: null,
  service: 'boards',
  path: 'boardManagement',
  notifier: () => Promise.resolve()
}

async function checkUniqueBoard (options, identifyBoard) {
  const errs = {}
  const boards = options.app.service(options.service)
  const { total } = await boards.find({
    query: {
      slug: identifyBoard.slug,
      company: identifyBoard.company,
      $limit: 0
    }
  })

  if (total > 0) {
    errs.name = 'Already taken.'
  }

  if (Object.keys(errs).length) {
    throw new BadRequest({ errors: errs })
  } else {
    return null
  }
}

function boardManagement (options, app) {
  options.app = app

  options.app.use(options.path, {
    create (data) {
      debug(`service called. action=${data.action}`)

      switch (data.action) {
        case 'checkUnique':
          return checkUniqueBoard(options, data.value)
        default:
          return Promise.reject(new errors.BadRequest(`Action '${data.action}' is invalid.`,
            { errors: { $className: 'badParams' } }))
      }
    }
  })
}

module.exports = function (options1 = {}) {
  debug('service being configured.')
  const options = Object.assign({}, optionsDefault, options1)

  return function () {
    return boardManagement(options, this)
  }
}
