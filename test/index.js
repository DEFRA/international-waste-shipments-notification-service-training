const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('API test', () => {
  let server

  // Create server before each test
  lab.before(async () => {
    server = await createServer()
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

  lab.test('PUT /notification/{notificationNumber} route works', async () => {
    const options = {
      method: 'PUT',
      url: '/notification/0001'
    }

    const creationResponse = await server.inject(options)
    Code.expect(creationResponse.statusCode).to.equal(201)
    const updateResponse = await server.inject(options)
    Code.expect(updateResponse.statusCode).to.equal(200)
  })
})
