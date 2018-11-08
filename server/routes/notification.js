const uuid = require('uuid')
const STATUS_BAD_REQUEST = 400
const STATUS_CREATED = 201
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404
const models = require('../models')

var notifications = {}
let notificationTypes = []

// Keep a record of notification numbers for efficient rejection of POST requests containing duplicate
// notification numbers.
var notificationNumbers = {}

const handlers = {
  get: (request, h) => {
    return notifications[request.params.id] || h.response().code(STATUS_NOT_FOUND)
  },
  post: async (request, h) => {
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
      responseCode = STATUS_CREATED
      let notificationtype = 1
      let notificationnumber = request.payload.notificationNumber
      // let description = 'test'
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
      console.log(request.payload)
      try {
        notificationTypes = await models.notification_notification.upsert({
          'id': id,
          // 'description': description,
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
          // 'id': id,
          // 'description': request.payload.description,
          // 'userid': request.payload.userid,
          // 'rowversion': request.payload.rowversion,
          // 'notificationtype': request.payload.notificationtype,
          // 'competentauthority': request.payload.competentauthority,
          // 'notificationnumber': request.payload.notificationnumber,
          // 'createddate': request.payload.createddate,
          // 'reasonforexport': request.payload.reasonforexport,
          // 'hasspecialhandlingrequirements': request.payload.hasspecialhandlingrequirements,
          // 'specialhandlingdetails': request.payload.specialhandlingdetails,
          // 'isrecoverypercentagedataprovidedbyimporter': request.payload.isrecoverypercentagedataprovidedbyimporter,
          // 'wastegenerationprocess': request.payload.wastegenerationprocess,
          // 'iswastegenerationprocessattached': request.payload.iswastegenerationprocessattached
        })
        return h.response().code(STATUS_OK)
      } catch (err) {
        console.log(err)
        return { 'Database error: ': err }
      }
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
