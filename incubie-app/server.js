const express = require('express')
const history = require('connect-history-api-fallback')
const compression = require('compression')
// import https from 'https'
// import fs from 'fs'
const app = express()

// serve the app
app.use(compression())
app.use(history())
app.use(express.static(__dirname + '/dist'))

// let options = {
//   key  : fs.readFileSync('./certs/testing.key'),
//   cert : fs.readFileSync('./certs/testing.crt')
// }

// const PORT = 8000
// https.createServer(options, app).listen(PORT, () => {
//  console.log('Service running on https', PORT)
// })

const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port
  console.log('API alive on port', port)
})