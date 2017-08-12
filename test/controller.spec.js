const
  supertest = require('supertest'),
  app = require('../app'),
  agent = supertest.agent(app)

describe('http requests', function () {
  describe('GET /wiki/', function () {
    it('gets 200 on index', function () {
      return agent.get('/wiki').expect(200)
    })
  })

  describe('GET /wiki/add', function () {
    it('responds with 200', function () {
      return agent.get('/wiki/add').expect(200)
    })
  })

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', function () {
      return agent.get('/wiki/arjoaxxxx').expect(404)
    })

    it('responds with 200 on page that does exist', function () {
      // return agent.
    })
  })

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200', function () {
      // return agent.
    })
  })

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist', function () {
      // return agent.
    })
    it('responds with 200 for similar page', function () {
      // return agent.
    })
  })

  describe('POST /wiki', function () {
    it('responds with 302', function () {
      // return agent.
    })
    it('creates a page in the database', function () {
      // return agent.
    })
  })
})
