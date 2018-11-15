const { authenticate } = require('@feathersjs/authentication').hooks
const dauria = require('dauria')
const sharp = require('sharp')
const { get } = require('lodash')

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      function (context) {
        console.log("ruby: ---------------01-----------config , ");
        const config = context.app.get('storage')
        const bucket = `${config.s3.bucket}/${get(context, 'data.bucket', 'uncategorized')}`

        context.params.s3 = {
          Bucket: bucket
        }
      },
      function (context) {
        console.log("ruby: ---------------02-----------config , ");
        if (!context.data.uri && context.params.file) {
          const file = context.params.file
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype)
          context.data = { uri: uri }
        }
      },
      async function (context) {
        console.log("ruby: ---------------03-----------config , ");
        const { thumb, uri } = context.data
        const file = dauria.parseDataURI(uri)
        const maxSide = thumb ? 190 : 1920
        const image = await sharp(file.buffer)
          .resize(maxSide, maxSide)
          .max()
          .withoutEnlargement()
          .toBuffer()

        context.data.uri = dauria.getBase64DataURI(image, file.MIME)
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
