// Initializes the `uploads` service on path `/uploads`
const createService = require('./uploads.class.js')
const hooks = require('./uploads.hooks')
const blobService = require('feathers-blob')
const fs = require('fs-blob-store')
const multer = require('multer')
const multipartMiddleware = multer()
const path = require('path')
const AWS = require('aws-sdk')
const S3BlobStore = require('s3-blob-store')

// const blobStorage = fs(path.join(__dirname, '../../../uploads'))

module.exports = function (app) {
  const paginate = app.get('paginate')

  const config = app.get('storage')
  const s3 = new AWS.S3({
    endpoint: `s3.${config.s3.region}.amazonaws.com`,
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  })

  const blobStore = S3BlobStore({
    client: s3,
    bucket: `${config.s3.imagesBucket}`
  })

  const options = {
    name: 'uploads',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/uploads', createService(options))
  app.use('/uploads',
    // multipartMiddleware.single('uri'),
    function (req, res, next) {
      req.feathers.file = req.file
      console.log('in express hook 2')
      next()
    },
    blobService({ Model: blobStore })
  )

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('uploads')

  service.hooks(hooks)
}
