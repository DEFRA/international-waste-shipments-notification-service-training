// **An initial in memory fake implementation - API versioning approach to be discussed**
const notificationService = require('../services/notification-service')
const STATUS_BAD_REQUEST = 400
const STATUS_CREATED = 201
const STATUS_OK = 200

const handlers = {
  get: (request, h) => {
    return notificationService.get(request.params.id)
  },
  post: async (request, h) => {
    let responseCode
    if (await notificationService.getbynumber(request.payload.notificationNumber) != null) {
      // There does not appear to be a standard for responding to duplicate POSTs.
      // Return a HTTP 400 status code for now.
      responseCode = STATUS_BAD_REQUEST
    } else {
      notificationService.create(request)
      responseCode = STATUS_CREATED
    }
    return h.response().code(responseCode)
  },
  put: async (request, h) => {
    let responseCode
    // Return the correct response code for PUT requests based on whether or not the notification has been 'created'.
    if (await notificationService.getbynumber(request.payload.notificationNumber)) {
      responseCode = STATUS_OK
    } else {
      responseCode = STATUS_CREATED
    }
    return h.response().code(responseCode)
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
