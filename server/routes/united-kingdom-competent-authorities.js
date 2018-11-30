'use strict'

const models = require('../models')
const STATUS_OK = 200
const STATUS_NOT_FOUND = 404
let ukCompetentAuthorities = []

const handlers = {
  get: async (request, h) => {
    try {
      ukCompetentAuthorities = await models.lookup_unitedkingdomcompetentauthority.findAll({
        order: ['id'],
        attributes: ['id', 'unitedkingdomcountry', 'bacsaccountname', 'bacsbank', 'bacsbankaddress', 'bacssortcode',
          'bacsaccountnumber', 'bacsiban', 'bacsswiftbic', 'bacsemail', 'bacsfax', 'remittancepostaladdress']
      })
      const responseCode = !Object.keys(ukCompetentAuthorities).length ? STATUS_NOT_FOUND : STATUS_OK
      return h.response(ukCompetentAuthorities).code(responseCode)
    } catch (err) {
      console.log(err)
      return h.response(err).code(500)
    }
  }
}

module.exports = {
  method: 'GET',
  path: '/united-kingdom-competent-authorities',
  options: {
    description: 'United Kingdom competent authority lookup API call',
    handler: handlers.get
  }
}
