const Lab = require('lab')
const Code = require('code')
const hoek = require('hoek')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('API test', () => {
  let server

  // Create server before the tests.
  lab.before(async () => {
    server = await createServer()
  })

  // Stop server after the tests.
  lab.after(async () => {
    await server.stop()
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

  lab.test('PUT /notification/{id} route works', async () => {
    const creationPayload = { method: 'PUT', payload: [{ authority: 'ea' }] }
    const updatePayload = { payload: [{ type: 'recovery' }] }
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

  lab.test('POST /notification route works', async () => {
    const options = {
      method: 'POST',
      url: '/notification',
      payload: {
        authority: 'ea',
        type: 'recovery',
        notificationNumber: '0003'
      }
    }
    const creationResponse = await server.inject(options)
    Code.expect(creationResponse.statusCode).to.equal(201)

    // Ensure that notification numbers cannot be reused.
    options.payload.authority = 'nrw'

    const duplicateResponse = await server.inject(options)
    // There does not appear to be a standard for responding to duplicate POSTs.
    // Expect a HTTP 400 status code for now.
    Code.expect(duplicateResponse.statusCode).to.equal(400)
  })
})
