'use strict'

const models = require('../models')

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

let notificationTypes = []

module.exports = {
  method: 'GET',
  path: '/notification-types',
  options: {
    handler: async (request, h) => {
      try {
        notificationTypes = await models.lookup_notificationtype.findAll({
          order: ['id'],
          attributes: ['id', 'description']
        })
        const responseCode = !Object.keys(notificationTypes).length ? STATUS_NOT_FOUND : STATUS_OK
        return h.response(notificationTypes).code(responseCode)
      } catch (err) {
        console.log(err)
        return h.response(err).code(500)
      }
    }
  }
}
