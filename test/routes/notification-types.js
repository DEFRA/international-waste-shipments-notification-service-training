const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const rewire = require('rewire')
const sinon = require('sinon')
const createServer = require('../../server')

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

  lab.test('lookup-notificationtype works', async () => {
    const notificationTypes = rewire('../../server/routes/notification-types')

    // Fake lookup_notificationtype data

    const types = {
      id: '1',
      description: 'Test type'
    }

    const models = {
      lookup_notificationtype: {
        findAll: sinon.stub().resolves(types)
      }
    }

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    const revert = notificationTypes.__set__({ models })

    await notificationTypes.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(200)
    })

    revert()
  })

  lab.test('empty lookup-notificationtype works', async () => {
    const notificationTypes = rewire('../../server/routes/notification-types')

    // Fake lookup_notificationtype data

    const types = {}

    const models = {
      lookup_notificationtype: {
        findAll: sinon.stub().resolves(types)
      }
    }

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    const revert = notificationTypes.__set__({ models })

    await notificationTypes.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(404)
    })

    revert()
  })

  lab.test('lookup-notificationtype error handled', async () => {
    const notificationTypes = rewire('../../server/routes/notification-types')

    // Fake lookup_notificationtype data

    const types = null

    const models = {
      lookup_notificationtype: {
        findAll: sinon.stub().resolves(types)
      }
    }

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    const revert = notificationTypes.__set__({ models })

    await notificationTypes.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(500)
    })

    revert()
  })
})
