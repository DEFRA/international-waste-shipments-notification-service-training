'use strict'

const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const models = require('../../server/models')

lab.experiment('lookup_unitedkingdomcompetentauthority model test', () => {
  lab.test('Check lookup_unitedkingdomcompetentauthority model exists', () => {
    Code.expect(models.lookup_unitedkingdomcompetentauthority).to.be.a.function()
  })
  lab.test('Check lookup_unitedkingdomcompetentauthority model name is correct', () => {
    Code.expect(models.lookup_unitedkingdomcompetentauthority.tableName).to.be.a.string()
    Code.expect(models.lookup_unitedkingdomcompetentauthority.tableName).to.equal('lookup_unitedkingdomcompetentauthority')
  })
})
