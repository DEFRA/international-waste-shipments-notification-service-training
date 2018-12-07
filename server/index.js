const hapi = require('hapi')
const config = require('./config')
const inert = require('inert')
const vision = require('vision')
const hapiSwagger = require('hapi-swagger')

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.servicePort,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: '0.01'
    }
  }

  // Register the plugins
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  await server.register(inert)
  await server.register(vision)
  await server.register({ plugin: hapiSwagger, options: swaggerOptions })

  if (config.isDev) {
    await server.register(require('blipp'))
    await server.register(require('./plugins/logging'))
  }

  return server
}

module.exports = createServer
