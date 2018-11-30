'use strict'

const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const models = require('../../server/models')

lab.experiment('lookup_competentauthority model test', () => {
  lab.test('Check lookup_competentauthority model exists', () => {
    Code.expect(models.lookup_competentauthority).to.be.a.function()
  })
  lab.test('Check lookup_competentauthority model name is correct', () => {
    Code.expect(models.lookup_competentauthority.tableName).to.be.a.string()
    Code.expect(models.lookup_competentauthority.tableName).to.equal('lookup_competentauthority')
  })
})
