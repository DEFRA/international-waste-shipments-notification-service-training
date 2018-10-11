const STATUS_CREATED = 201
const STATUS_OK = 200
var notificationNumbers = {}

const handlers = {
  get: (request, h) => {
    return notificationNumbers[request.params.notificationNumber]
  },
  put: (request, h) => {
    let responseCode
    // Return the correct response code for PUT requests based on whether or not the notic
    if (notificationNumbers[request.params.notificationNumber]) {
      responseCode = STATUS_OK
    } else {
      responseCode = STATUS_CREATED
    }
    // As the initial implementation is just a fake, use simple in memory storage.
    notificationNumbers[request.params.notificationNumber] = request.payload
    return h.response().code(responseCode)
  }
}

module.exports = [{
  method: 'GET',
  path: '/notification/{notificationNumber}',
  options: {
    handler: handlers.get
  }
},
{
  method: 'PUT',
  path: '/notification/{notificationNumber}',
  options: {
    handler: handlers.put
  }
}]
