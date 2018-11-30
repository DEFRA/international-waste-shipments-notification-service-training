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

  lab.test('GET /notification works', async () => {
    const notification = rewire('../../server/services/notification-service')
    // Fake notification_notification data
    const notificationData = {
      'id': '1111-1111-1111-1111',
      'userid': '1',
      'notificationtype': 1,
      'competentauthority': 1,
      'notificationnumber': '1',
      'createddate': '2018-10-15',
      'reasonforexport': 'Test',
      'hasspecialhandlingrequirements': true,
      'specialhandlingdetails': 'Test',
      'isrecoverypercentagedataprovidedbyimporter': true,
      'wastegenerationprocess': 'Test',
      'iswastegenerationprocessattached': true
    }

    const models = {
      notification_notification: {
        findAll: sinon.stub().resolves(notificationData)
      }
    }

    const revert = notification.__set__({ models })

    const request = { params: {} }
    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }
    request.params.id = '1111-1111-1111-1111'

    await notification.get(request, h).then((result) => {
      Code.expect(result).to.equal(200)
    })

    revert()
  })

  lab.test('GET /notification works handles empty table', async () => {
    const notification = rewire('../../server/services/notification-service')
    // Fake empty notification_notification data
    const notificationData = {}

    const models = {
      notification_notification: {
        findAll: sinon.stub().resolves(notificationData)
      }
    }

    const revert = notification.__set__({ models })

    const request = { params: {} }
    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }
    request.params.id = '1111-1111-1111-1111'

    await notification.get(request, h).then((result) => {
      Code.expect(result).to.equal(404)
    })

    revert()
  })

  lab.test('GET /notification works handles error', async () => {
    const notification = rewire('../../server/services/notification-service')
    // Fake empty notification_notification data
    const notificationData = null

    const models = {
      notification_notification: {
        findAll: sinon.stub().resolves(notificationData)
      }
    }

    const revert = notification.__set__({ models })

    const request = { params: {} }
    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }
    request.params.id = '1111-1111-1111-1111'

    await notification.get(request, h).then((result) => {
      Code.expect(result).to.equal(500)
    })

    revert()
  })

  lab.test('/POST - create notification via upsert works', async () => {
    const notification = rewire('../../server/services/notification-service')
    // Fake notification_notification data
    const notificationData = [{
      'userid': '1',
      'notificationtype': 1,
      'competentauthority': 1,
      'notificationnumber': '1',
      'createddate': '2018-10-15',
      'reasonforexport': 'Test',
      'hasspecialhandlingrequirements': true,
      'specialhandlingdetails': 'Test',
      'isrecoverypercentagedataprovidedbyimporter': true,
      'wastegenerationprocess': 'Test',
      'iswastegenerationprocessattached': true
    },
    true
    ]

    const models = {
      notification_notification: {
        upsert: sinon.stub().resolves(notificationData)
      }
    }

    const revertModels = notification.__set__({ models })

    // Fake upsert 'parent'

    const createPayload = {
      method: 'post',
      payload: {
        'userid': '1',
        'notificationtype': 1,
        'competentauthority': 1,
        'notificationnumber': '1',
        'createddate': '2018-10-15',
        'reasonforexport': 'Test',
        'hasspecialhandlingrequirements': true,
        'specialhandlingdetails': 'Test',
        'isrecoverypercentagedataprovidedbyimporter': true,
        'wastegenerationprocess': 'Test',
        'iswastegenerationprocessattached': true
      }
    }

    const h = {
      response: (record) => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await notification.upsert(createPayload, h).then((result) => {
      Code.expect(result).to.equal(201)
    })

    revertModels()
  })

  lab.test('/PUT - update notification via upsert works', async () => {
    const notification = rewire('../../server/services/notification-service')
    // Fake notification_notification data
    const notificationData = [{
      'id': '1111-1111-1111-1111',
      'userid': '1',
      'notificationtype': 1,
      'competentauthority': 1,
      'notificationnumber': '1',
      'createddate': '2018-10-15',
      'reasonforexport': 'Test',
      'hasspecialhandlingrequirements': true,
      'specialhandlingdetails': 'Test',
      'isrecoverypercentagedataprovidedbyimporter': true,
      'wastegenerationprocess': 'Test',
      'iswastegenerationprocessattached': true
    },
    false
    ]

    const models = {
      notification_notification: {
        upsert: sinon.stub().resolves(notificationData)
      }
    }

    const revertModels = notification.__set__({ models })

    const updatePayload = {
      method: 'put',
      payload: {
        'id': '1111-1111-1111-1111',
        'userid': '1',
        'notificationtype': 1,
        'competentauthority': 2,
        'notificationnumber': '2',
        'createddate': '2018-10-15',
        'reasonforexport': 'Test',
        'hasspecialhandlingrequirements': true,
        'specialhandlingdetails': 'Test',
        'isrecoverypercentagedataprovidedbyimporter': true,
        'wastegenerationprocess': 'Test',
        'iswastegenerationprocessattached': true
      }
    }

    const h = {
      response: (record) => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await notification.upsert(updatePayload, h).then((result) => {
      Code.expect(result).to.equal(200)
    })

    revertModels()
  })

  lab.test('notification upsert errors handled part 2', async () => {
    const notification = rewire('../../server/services/notification-service')
    // Fake notification_notification data
    const notificationData = null

    const models = {
      notification_notification: {
        upsert: sinon.stub().resolves(notificationData)
      }
    }

    const revertModels = notification.__set__({ models })

    const creationPayload = {
      payload: {
        'notificationtype': 1,
        'competentauthority': 2,
        'notificationnumber': '2',
        'createddate': '2018-10-15',
        'reasonforexport': 'Test',
        'hasspecialhandlingrequirements': true,
        'specialhandlingdetails': 'Test',
        'isrecoverypercentagedataprovidedbyimporter': true,
        'wastegenerationprocess': 'Test',
        'iswastegenerationprocessattached': true
      }
    }

    const h = {
      response: (record) => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await notification.upsert(creationPayload, h).then((result) => {
      Code.expect(result).to.equal(500)
    })

    revertModels()
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
