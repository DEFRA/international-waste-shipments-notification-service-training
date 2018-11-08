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

      let notificationtype = 1
      let notificationnumber = request.payload.notificationNumber
      let userid = '001'
      let rowversion = '2'
      let competentauthority
      switch (request.payload.authority) {
        case 'ea':
          competentauthority = '1'
          break
        case 'sepa':
          competentauthority = '2'
          break
        case 'niea':
          competentauthority = '3'
          break
        case 'nrw':
          competentauthority = '4'
          break
      }
      let createddate = '2018-10-15'
      let reasonforexport = 'test'
      let hasspecialhandlingrequirements = true
      let specialhandlingdetails = 'test'
      let isrecoverypercentagedataprovidedbyimporter = true
      let wastegenerationprocess = 'test'
      let iswastegenerationprocessattached = true

      db.notification_notification.upsert({
        'id': id,
        'userid': userid,
        'rowversion': rowversion,
        'notificationtype': notificationtype,
        'competentauthority': competentauthority,
        'notificationnumber': notificationnumber,
        'createddate': createddate,
        'reasonforexport': reasonforexport,
        'hasspecialhandlingrequirements': hasspecialhandlingrequirements,
        'specialhandlingdetails': specialhandlingdetails,
        'isrecoverypercentagedataprovidedbyimporter': isrecoverypercentagedataprovidedbyimporter,
        'wastegenerationprocess': wastegenerationprocess,
        'iswastegenerationprocessattached': iswastegenerationprocessattached
      })

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
