'use strict'

const models = require('../models')

const STATUS_OK = 200
const STATUS_NOT_FOUND = 404

let countries = []

module.exports = {
  method: 'GET',
  path: '/lookup-country',
  options: {
    handler: async (request, h) => {
      try {
        countries = await models.lookup_country.findAll({
          order: ['id'],
          attributes: ['id', 'name', 'isoalpha2code']
        })
        const responseCode = !Object.keys(countries).length ? STATUS_NOT_FOUND : STATUS_OK
        return h.response(countries).code(responseCode)
      } catch (err) {
        console.log(err)
        return h.response('err').code(500)
      }
    }
  }
}
