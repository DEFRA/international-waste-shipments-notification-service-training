'use strict'

// **An initial in memory fake implementation - API versioning approach to be discussed**
const notificationService = require('../services/notification-service')

const handlers = {
  get: async (request, h) => {
    let response = await notificationService.get(request, h)
    return response
  },
  upsert: async (request, h) => {
    let response = await notificationService.upsert(request, h)
    return response
  }
}

module.exports = [{
  method: 'GET',
  path: '/notification/{id}',
  options: {
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/notification',
  options: {
    handler: handlers.upsert
  }
},
{
  method: 'PUT',
  path: '/notification/{id}',
  options: {
    handler: handlers.upsert
  }
}]
