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

  lab.test('lookup_unitedkingdomcompetentauthority works', async () => {
    const ukCompetentAuthorities = rewire('../../server/routes/united-kingdom-competent-authorities')

    // Fake lookup competent authority data

    const ukCompetentAuthority = {
      id: 1,
      unitedkingdomcountry: 'England',
      bacsaccountname: 'EA',
      bacsbank: 'Bank',
      bacsbankaddress: 'Bank, London, Floor, 280 street, London, EC1 2QQ',
      bacssortcode: '11-22-33',
      bacsaccountnumber: '11111111',
      bacsiban: 'GB11AAAA11111111111111',
      bacsswiftbic: 'AAAAAA1A',
      bacsemail: 'dev@email.gov.uk',
      bacsfax: '01234 123456',
      remittancepostaladdress: 'Environment Agency, Bank Team, PO Box 111, London, L1 1QQ'
    }

    const models = {
      lookup_unitedkingdomcompetentauthority: {
        findAll: sinon.stub().resolves(ukCompetentAuthority)
      }
    }

    const revert = ukCompetentAuthorities.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await ukCompetentAuthorities.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(200)
    })

    revert()
  })

  lab.test('empty lookup_unitedkingdomcompetentauthority handled', async () => {
    const ukCompetentAuthorities = rewire('../../server/routes/united-kingdom-competent-authorities')

    // Fake lookup competent authority data

    const ukCompetentAuthority = {}

    const models = {
      lookup_unitedkingdomcompetentauthority: {
        findAll: sinon.stub().resolves(ukCompetentAuthority)
      }
    }

    const revert = ukCompetentAuthorities.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await ukCompetentAuthorities.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(404)
    })

    revert()
  })

  lab.test('lookup_unitedkingdomcompetentauthority error handled', async () => {
    const ukCompetentAuthorities = rewire('../../server/routes/united-kingdom-competent-authorities')

    // Fake lookup competent authority data

    const ukCompetentAuthority = null

    const models = {
      lookup_unitedkingdomcompetentauthority: {
        findAll: sinon.stub().resolves(ukCompetentAuthority)
      }
    }

    const revert = ukCompetentAuthorities.__set__({ models })

    const request = {}

    const h = {
      response: () => {
        this.code = (code) => {
          return code
        }
        return this
      }
    }

    await ukCompetentAuthorities.options.handler(request, h).then((result) => {
      Code.expect(result).to.equal(500)
    })

    revert()
  })
})
