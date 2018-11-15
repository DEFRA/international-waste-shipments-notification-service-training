const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../server')
const notificationService = require('../server/services/notification-service')

lab.experiment('API test', () => {
  let server
  let sandbox
  let notifications = []

  // Create server before the tests.
  lab.before(async () => {
    server = await createServer()
    notifications = [{
      id: '0001',
      notificationnumber: 'GB001',
      notificationtype: 1,
      competentauthority: 1
    },
    {
      id: '0002',
      notificationnumber: 'GB002',
      notificationtype: 1,
      competentauthority: 2
    }]
  })

  // Stop server after the tests.
  lab.after(async () => {
    await server.stop()
  })

  lab.beforeEach(async () => {
    sandbox = await sinon.createSandbox()
  })

  lab.afterEach(async () => {
    await sandbox.restore()
  })

  lab.test('GET / route works', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.equal({ hello: 'world' })
  })

  lab.test('GET /about route works', async () => {
    const options = {
      method: 'GET',
      url: '/about'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.equal({ ok: 200 })
  })

  lab.test('Missing resources are handled correctly', async () => {
    const options = {
      method: 'GET',
      url: '/missing/resource'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('Retrieval of a non-existent notification returns a HTTP 404 status code', async () => {
    var mockGet = sinon.stub(notificationService, 'get').callsFake(function fakeGet (id) {
      return notifications.find(x => x.id === id)
    })

    const options = {
      method: 'GET',
      url: '/notification/0003'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
    mockGet.restore()
  })

  lab.test('Retrieval of existing notification returns a HTTP 200 status code', async () => {
    var mockGet = sinon.stub(notificationService, 'get').callsFake(function fakeGet (id) {
      return notifications.find(x => x.id === id)
    })

    const options = {
      method: 'GET',
      url: '/notification/0001'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    mockGet.restore()
  })
})
