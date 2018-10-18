const Lab = require('lab')
const Code = require('code')
const hoek = require('hoek')
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
    const creationPayload = { method: 'PUT', payload: [{ hello: 'world' }] }
    const updatePayload = { payload: [{ hi: 'new world' }] }
    const options = {
      url: '/notification/0001'
    }

    const getOptions = hoek.merge({ method: 'GET' }, options)
    const creationOptions = hoek.merge(creationPayload, options)
    const updateOptions = hoek.merge(updatePayload, creationOptions)

    const creationResponse = await server.inject(creationOptions)
    Code.expect(creationResponse.statusCode).to.equal(201)
    Code.expect(JSON.parse((await server.inject(getOptions)).payload).length).to.equal(1)
    const updateResponse = await server.inject(updateOptions)
    Code.expect(updateResponse.statusCode).to.equal(200)
    Code.expect(JSON.parse((await server.inject(getOptions)).payload).length).to.equal(2)
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
    const options = {
      method: 'GET',
      url: '/notification/0002'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })
})
