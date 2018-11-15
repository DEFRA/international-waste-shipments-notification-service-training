// **An initial in memory fake implementation - API versioning approach to be discussed**
const notificationService = require('../services/notification-service')
const STATUS_OK = 200

const handlers = {
  get: (request, h) => {
    return notificationService.get(request.params.id)
  },
  post: async (request, h) => {
    await notificationService.createOrUpdate(request)
    return h.response().code(STATUS_OK)
  },
  put: async (request, h) => {
    await notificationService.createOrUpdate(request)
    return h.response().code(STATUS_OK)
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
    handler: handlers.post
  }
},
{
  method: 'PUT',
  path: '/notification/{id}',
  options: {
    handler: handlers.put
  }
}]
