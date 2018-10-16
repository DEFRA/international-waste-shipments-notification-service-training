// **An initial in memory fake implementation - API versioning approach to be discussed**
const STATUS_CREATED = 201
const STATUS_OK = 200
var notifications = {}

const handlers = {
  get: (request, h) => {
    return notifications[request.params.id]
  },
  put: (request, h) => {
    let responseCode
    // Return the correct response code for PUT requests based on whether or not the notification has been 'created'.
    if (notifications[request.params.id]) {
      responseCode = STATUS_OK
    } else {
      responseCode = STATUS_CREATED
    }
    // As the initial implementation is just a fake, use simple in memory storage.
    notifications[request.params.id] = request.payload
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
  method: 'PUT',
  path: '/notification/{id}',
  options: {
    handler: handlers.put
  }
}]
