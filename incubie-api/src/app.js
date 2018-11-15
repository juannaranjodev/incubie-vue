const path = require('path')
const favicon = require('serve-favicon')
const compress = require('compression')
const helmet = require('helmet')
const logger = require('./logger')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const feathers = require('@feathersjs/feathers')
const configuration = require('@feathersjs/configuration')
const express = require('@feathersjs/express')
const socketio = require('@feathersjs/socketio')
// ray test added for stripe
const stripe = require('feathers-stripe');

const middleware = require('./middleware')
const services = require('./services')
const appHooks = require('./app.hooks')
const channels = require('./channels')

const authentication = require('./services/authentication/authentication.service')

const mongoose = require('./mongoose')

// ray test added
const secrets = require('./config/secretes')

const app = express(feathers())



// Load app configuration
app.configure(configuration())
// Enable morgan, security, compression, favicon and body parsing
app.use(morgan('dev'))
app.use(helmet())
app.use(compress())
app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(express.urlencoded({
  limit: '10mb',
  extended: true
}))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')))
// Host the public folder
app.use('/', express.static(app.get('public')))

// Set up Plugins and providers
app.configure(express.rest())
app.configure(socketio())

app.configure(mongoose)

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware)
app.configure(authentication)
// Set up our services (see `services/index.js`)
app.configure(services)
// Set up event channels (see channels.js)
app.configure(channels)

// Configure a middleware for 404s and the error handler
app.use(express.notFound())
app.use(express.errorHandler({ logger }))

// ray test added for stripe
const stripeSecKey = secrets.stripeOptions.stripeSecKey;
app.use('/stripe/charges', new stripe.Charge({ secretKey: stripeSecKey }));
app.use('/stripe/invoices', new stripe.Charge({ secretKey: stripeSecKey })); // ruby test
app.use('/stripe/customers', new stripe.Customer({ secretKey: stripeSecKey }));
app.use('/stripe/subscriptions', new stripe.Subscription({ secretKey: stripeSecKey }));

app.hooks(appHooks)

module.exports = app
