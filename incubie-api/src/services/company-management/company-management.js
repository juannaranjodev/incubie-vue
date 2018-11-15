const logger = require('../../logger')
const path = require('path')
const Handlebars = require('handlebars')
const fs = require('fs')
const errors = require('@feathersjs/errors')
const debug = require('debug')('companyManagement:main')
const changeCase = require('change-case')

const optionsDefault = {
  app: null,
  service: 'companies',
  path: 'companyManagement',
  notifier: () => Promise.resolve()
}

async function validateCompany (options, identifyCompany) {
  const errs = {}
  const name = identifyCompany.name
  const slug = identifyCompany.slug || changeCase.paramCase(changeCase.lowerCase(name))
  const companiesService = options.app.service(options.service)

  if (!slug || !slug.length) {
    errs.company = 'Name is required.'
  } else {
    const companies = await companiesService.find({
      query: {
        name,
        slug
      }
    })

    if (companies.length) {
      errs.company = 'Already taken.'
    }
  }

  if (Object.keys(errs).length) {
    throw new errors.BadRequest({ errors: errs })
  } else {
    return null
  }
}

async function inviteMembers (options, value, params) {
  const { app } = options
  const config = app.get('authentication')
  const fromUser = params.user
  const fromEmail = config.google.email
  const returnEmail = config.google.email
  let emailAccountTemplatesPath = path.join(
    __dirname,
    '../../',
    'templates',
    'account'
  )
  let templatePath
  let template
  let compiledHTML
  let email
  let hashLink = 'http://incubie.com'

  console.log('*************')
  console.log(fromUser)

  value.members.forEach(member => {
    templatePath = path.join(
      emailAccountTemplatesPath,
      'invitation.hbs'
    )
    template = Handlebars.compile(fs.readFileSync(templatePath, 'utf8'))
    compiledHTML = template({
      name: member.name,
      fromName: `${fromUser.firstName}`,
      hashLink,
      returnEmail
    })
    email = {
      from: fromEmail,
      to: member.email,
      subject: `${fromUser.firstName} invited you to join ${value.company.name} on Incubie`,
      html: compiledHTML
    }

    sendEmail(email)
  })

  return 'HOt damn'

  async function sendEmail (email) {
    try {
      const result = await app.service('emails').create(email)
      logger.info('Sent email', result)
    } catch (err) {
      logger.error('Error sending email', err)
    }
  }
}

function companyManagement (options, app) {
  options.app = app

  options.app.use(options.path, {
    create (data, params) {
      debug(`service called. action=${data.action}`)

      switch (data.action) {
        case 'validateCompany':
          return validateCompany(options, data.value)

        case 'inviteMembers':
          return inviteMembers(options, data.value, params)

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
    return companyManagement(options, this)
  }
}
