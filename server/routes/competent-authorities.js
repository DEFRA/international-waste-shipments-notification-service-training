'use strict'

const models = require('../models')
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404
let competentAuthorities = []

const handlers = {
  get: async (request, h) => {
    try {
      competentAuthorities = await models.lookup_competentauthority.findAll({
        order: ['id'],
        attributes: ['id', 'name', 'abbreviation', 'issystemuser', 'code', 'countryid', 'region', 'istransitauthority']
      })
      const responseCode = !Object.keys(competentAuthorities).length ? STATUS_NOT_FOUND : STATUS_OK
      return h.response(competentAuthorities).code(responseCode)
    } catch (err) {
      console.log(err)
      return h.response(err).code(500)
    }
  }
}

module.exports = {
  method: 'GET',
  path: '/competent-authorities',
  options: {
    description: 'Competent authority lookup API call',
    tags: ['api', 'competent-authorities'],
    handler: handlers.get
  }
}
