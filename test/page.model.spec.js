const
  expect = require('chai').expect,
  chai = require('chai'),
  spies = require('chai-spies'),
  models = require('../models'),
  chaiThings = require('chai-things')

chai.use(spies)

describe('Testing the Page model', function () {
  var allPages

  beforeEach(function () {
    return models.db.sync({ force: true })
        .then(() => models.User.create({
          name: 'Barto',
          email: 'barto@molina.com'
        }))
        .then(() => models.Page.bulkCreate([
            {title: 'page 1', content: '#blablabla', tags: ['one', 'two'], authorId: 1, status: 'open'},
            {title: 'page 2', content: '**blaba**', tags: ['three', 'two'], authorId: 1, status: 'open'},
            {title: 'page 3', content: 'bla [[page 2]]', tags: ['three'], authorId: 1, status: 'closed'}
        ], {validate: true, individualHooks: true}))
        .then(() => models.Page.findAll())
        .then((result) => allPages = result)
        .catch(console.error)
  })

  describe('Confirms that columns exist', function () {
    it('should have all columns populated', function () {
      allPages.forEach(function (el) {
        expect(el).to.have.property('title')
      })
    })
  })

  describe('Checking data', function () {
    it('Has 3 entries', function () {
      expect(allPages.length).to.equal(3)
    })
  })

  describe('has route virtual', function () {
    var page
    beforeEach(() => {
      page = models.Page.build()
    })
    it('prepends "/wiki/" to urlTitle', function () {
      page.urlTitle = 'PH'
      expect(page.route).to.equal('/wiki/PH')
    })
  })

  describe('has a findByTag method', function () {
    it('finds pages with a given tag', function () {
      return models.Page.findByTag('two')
           .then(result => {
             expect(result.length).to.equal(2)
           })
    })
    it('return 0 for nonexistent tags', function () {
      return models.Page.findByTag('nonexjaoirjoajroajroa')
        .then(result => {
          expect(result.length).to.equal(0)
        })
    })
  })

  describe('has a findSimilar method', function () {
    it('finds similar pages containing overlapping tags', function () {
      return models.Page.findOne({where: {
        title: 'page 1'
      }})
        .then(page1 => page1.findSimilar())
        .then(pages => expect(pages.length).to.equal(1))
    })
  })

  describe('validates!', function () {
    var page
    beforeEach(() => {
      page = models.Page.build()
    })
    it('is awesome', function () {
      page.validate()
        .then(function (err) {
          expect(err).to.exist
          expect(err.errors).to.exist
          expect(err.errors[0].path).to.equal('title')
        })
    })
  })

  describe('hooks into blah blah', function () {
    var page
    beforeEach(() => {
      page = models.Page.build()
    })
    it('is awesome', function () {
      page.title = 'PHo ia jrioaj roaijjr'
      page.content = 'haiprhiahrairhiuh'
      return page.validate()
            .then(() => {
              expect(page.urlTitle).is.a('string')
              expect(page.urlTitle).to.equal('PHo_ia_jrioaj_roaijjr')
            })
    })
  })
})
