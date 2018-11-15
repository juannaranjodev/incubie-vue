const path = require('path')
const Handlebars = require('handlebars')
const fs = require('fs')
const crypto = require('crypto')

const randomBytes = len => new Promise((resolve, reject) => {
  crypto.randomBytes(len, (err, buf) => (err ? reject(err) : resolve(buf.toString('hex'))))
})

const getLongToken = len => randomBytes(len)

const getTemplate = (template) => {
  const templatePath = path.join(
    path.join(
      __dirname,
      'templates',
    ),
    `${template}.hbs`
  )

  return Handlebars.compile(fs.readFileSync(templatePath, 'utf8'))
}

module.exports = {
  randomBytes,
  getLongToken,
  getTemplate
}
