// **An initial in memory fake implementation - API versioning approach to be discussed**
const uuid = require('uuid')
const models = require('../models')

// const STATUS_BAD_REQUEST = 400
const STATUS_CREATED = 201
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

let notifications = {}

// Keep a record of notification numbers for efficient rejection of POST requests containing duplicate
// notification numbers. TODO: Complete this if needed.
let notificationNumbers = {}

const handlers = {
  get: async (request, h) => {
    try {
      let responseCode

      const notification = await models.notification_notification.findAll({
        where: {
          id: request.params.id
        }
      })

      responseCode = !Object.keys(notification).length ? STATUS_NOT_FOUND : STATUS_OK
      return h.response(notification).code(responseCode)
    } catch (err) {
      console.log(err)
      return h.response(err).code(500)
    }
  },

  upsert: async (request, h) => {
    try {
      let responseCode

      if (request.payload.id === undefined) {
        const id = uuid.v4()
        request.payload.id = id
        notifications[id] = request.payload
        notificationNumbers[request.payload.notificationNumber] = true
      }

      const [notification, created] = await models.notification_notification.upsert({
        id: request.payload.id,
        userid: request.payload.userid,
        notificationtype: request.payload.notificationtype,
        competentauthority: request.payload.competentauthority,
        notificationnumber: request.payload.notificationnumber,
        rowversion: '1',
        createddate: request.payload.createddate,
        reasonforexport: request.payload.reasonforexport,
        hasspecialhandlingrequirements: request.payload.hasspecialhandlingrequirements,
        specialhandlingdetails: request.payload.specialhandlingdetails,
        isrecoverypercentagedataprovidedbyimporter: request.payload.isrecoverypercentagedataprovidedbyimporter,
        wastegenerationprocess: request.payload.wastegenerationprocess,
        iswastegenerationprocessattached: request.payload.iswastegenerationprocessattached
      },
      {
        returning: true
      })

      responseCode = created ? STATUS_CREATED : STATUS_OK

      return h.response(notification).code(responseCode)
    } catch (err) {
      console.log(err)
      return h.response(err).code(500)
    }
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
