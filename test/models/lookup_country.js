'use strict'

const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const models = require('../../server/models')

lab.experiment('lookup_country model test', () => {
  lab.test('Check lookup_country model exists', () => {
    Code.expect(models.lookup_country).to.be.a.function()
  })
  lab.test('Check lookup_country model name is correct', () => {
    Code.expect(models.lookup_country.tableName).to.be.a.string()
    Code.expect(models.lookup_country.tableName).to.equal('lookup_country')
  })
})
