// As the initial implementation is just a fake, keep a record of which notifications
// the endpoints have been called for so the right HTTP response codes are returned.
const STATUS_CREATED = 201
const STATUS_OK = 200
var notificationNumbers = {}

const handlers = {
  put: (request, h) => {
    let responseCode
    if (notificationNumbers[request.params.notificationNumber]) {
      responseCode = STATUS_OK
    } else {
      notificationNumbers[request.params.notificationNumber] = true
      responseCode = STATUS_CREATED
    }
    return h.response().code(responseCode)
  }
}

module.exports = {
  method: 'PUT',
  path: '/notification/{notificationNumber}',
  options: {
    handler: handlers.put
  }
}
