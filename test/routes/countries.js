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

  lab.test('lookup-country works', async () => {
    const lookupCountry = rewire('../../server/routes/countries')

    // Fake lookup_country data

    const countries = {
      id: '1',
      name: 'Test Country',
      isoalpha2code: 'TC',
      iseuropeanunionmember: true
    }

    const models = {
      lookup_country: {
        findAll: sinon.stub().resolves(countries)
      }
    }

    const revert = lookupCountry.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await lookupCountry.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(200)
    })

    revert()
  })

  lab.test('empty lookup-country handled', async () => {
    const lookupCountry = rewire('../../server/routes/countries')

    // Fake lookup_country data

    const countries = {}

    const models = {
      lookup_country: {
        findAll: sinon.stub().resolves(countries)
      }
    }

    const revert = lookupCountry.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await lookupCountry.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(404)
    })

    revert()
  })

  lab.test('lookup-country error handled', async () => {
    const lookupCountry = rewire('../../server/routes/countries')

    // Fake lookup_country data

    const countries = null

    const models = {
      lookup_country: {
        findAll: sinon.stub().resolves(countries)
      }
    }

    const revert = lookupCountry.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await lookupCountry.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(500)
    })

    revert()
  })
})
