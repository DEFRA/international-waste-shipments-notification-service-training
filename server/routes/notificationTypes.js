'use strict'

const models = require('../models')

const STATUS_NOT_FOUND = 404
const SUCCESSFUL = 203

let notificationTypes = []

module.exports = [{
  method: 'GET',
  path: '/notification-types',
  options: {
    handler: async (request, h) => {
      try {
        notificationTypes = await models.lookup_notificationtype.findAll({
          order: ['id'],
          attributes: ['id', 'description']
        })
        return notificationTypes || h.response().code(STATUS_NOT_FOUND)
      } catch (err) {
        console.log(err)
        return { 'Database error: ': err }
      }
    }
  }
},
{
  method: 'POST',
  path: '/notification-types',
  options: {
    handler: async (request, h) => {
      let id = request.payload.id
      let description = request.payload.description
      try {
        notificationTypes = await models.lookup_notificationtype.upsert({
          'id': id,
          'description': description
        })
        return h.response().code(SUCCESSFUL)
      } catch (err) {
        console.log(err)
        return { 'Database error: ': err }
      }
    }
  }
}
]
