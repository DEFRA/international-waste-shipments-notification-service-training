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

  lab.test('lookup_competentauthority works', async () => {
    const competentAuthorities = rewire('../../server/routes/competent-authorities')

    // Fake lookup competent authority data

    const competentAuthority = {
      id: '1',
      name: 'Test authority',
      abbreviation: null,
      issystemuser: 'false',
      code: 'CO',
      countryid: '1234',
      region: null,
      istransitauthority: null
    }

    const models = {
      lookup_competentauthority: {
        findAll: sinon.stub().resolves(competentAuthority)
      }
    }

    const revert = competentAuthorities.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await competentAuthorities.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(200)
    })

    revert()
  })

  lab.test('empty lookup_competentauthority handled', async () => {
    const competentAuthorities = rewire('../../server/routes/competent-authorities')

    // Fake lookup competent authority data

    const competentAuthority = {}

    const models = {
      lookup_competentauthority: {
        findAll: sinon.stub().resolves(competentAuthority)
      }
    }

    const revert = competentAuthorities.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await competentAuthorities.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(404)
    })

    revert()
  })

  lab.test('lookup_competentauthority error handled', async () => {
    const competentAuthorities = rewire('../../server/routes/competent-authorities')

    // Fake lookup competent authority data

    const competentAuthority = null

    const models = {
      lookup_competentauthority: {
        findAll: sinon.stub().resolves(competentAuthority)
      }
    }

    const revert = competentAuthorities.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await competentAuthorities.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(500)
    })

    revert()
  })
})
