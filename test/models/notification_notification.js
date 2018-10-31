'use strict'

const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const models = require('../../server/models')

lab.experiment('notification_notification model test', () => {
  lab.test('Check notification_notification model exists', () => {
    Code.expect(models.notification_notification).to.be.a.function()
  })
  lab.test('Check notification_notification model name is correct', () => {
    Code.expect(models.notification_notification.tableName).to.be.a.string()
    Code.expect(models.notification_notification.tableName).to.equal('notification_notification')
  })
})
