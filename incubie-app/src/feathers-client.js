import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import AuthManagement from 'feathers-authentication-management'

const socket = io(process.env.VUE_APP_API_BASE_URL, {
  transports: ['websocket']
})

console.log(process.env)
socket.on('connect', () => {
  console.log('socket connected', process.env.VUE_APP_API_BASE_URL)
})

socket.on('event', data => {
  console.log('event')
  console.dir(data)
})

socket.on('disconnect', () => {
  console.log('socket disconnected')
})

socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket']
})

const feathersClient = feathers()
  .configure(socketio(socket, {
    timeout: 50000
  }))
  .configure(auth({
    storage: window.localStorage
  }))

export const services = feathersClient.services;

console.log(services);

export default feathersClient
export const authManagement = new AuthManagement(feathersClient)