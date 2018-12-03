'use strict'

const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const models = require('../../server/models')

lab.experiment('lookup_notificationtype model test', () => {
  lab.test('Check lookup_notificationtype model exists', () => {
    Code.expect(models.lookup_notificationtype).to.be.a.function()
  })
  lab.test('Check lookup_notificationtype model name is correct', () => {
    Code.expect(models.lookup_notificationtype.tableName).to.be.a.string()
    Code.expect(models.lookup_notificationtype.tableName).to.equal('lookup_notificationtype')
  })
})
