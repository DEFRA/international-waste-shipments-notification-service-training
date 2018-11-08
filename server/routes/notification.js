// **An initial in memory fake implementation - API versioning approach to be discussed**
const uuid = require('uuid')
const db = require('../models')
const STATUS_BAD_REQUEST = 400
const STATUS_CREATED = 201
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

var notifications = {}

// Keep a record of notification numbers for efficient rejection of POST requests containing duplicate
// notification numbers.
var notificationNumbers = {}

const handlers = {
  get: (request, h) => {
    return notifications[request.params.id] || h.response().code(STATUS_NOT_FOUND)
  },
  post: (request, h) => {
    let responseCode
    if (notificationNumbers[request.payload.notificationNumber]) {
      // There does not appear to be a standard for responding to duplicate POSTs.
      // Return a HTTP 400 status code for now.
      responseCode = STATUS_BAD_REQUEST
    } else {
      // Generate a UUID to identify the notification rather than the notification number.
      // UUID usage adds a line of defence against clients being able to retrieve data by
      // guessing notification numbers.
      const id = uuid.v4()
      request.payload.id = id
      notifications[id] = request.payload
      notificationNumbers[request.payload.notificationNumber] = true

      // TODO currently this just creates a test record.  Need to refactor to lookup competent authority and set
      // real values not just random stuff
      let notification = {
        id: id,
        notificationtype: 1,
        notificationnumber: request.payload.notificationNumber,
        userid: 'user',
        rowversion: '1',
        competentauthority: 1,
        createddate: new Date(),
        reasonforexport: 'reason',
        hasspecialhandlingrequirements: true,
        specialhandlingdetails: 'details',
        isrecoverypercentagedataprovidedbyimporter: true,
        wastegenerationprocess: 'process',
        iswastegenerationprocessattached: true
      }

      db.notification_notification.upsert(notification)

      responseCode = STATUS_CREATED
    }
    return h.response().code(responseCode)
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
