import { expect, default as chai } from 'chai'
import { default as sinonChai } from 'sinon-chai'
import sinon from 'sinon'
import 'mocha'
import { configureExpress } from './configureExpress'
import { default as express } from 'express'

chai.use(sinonChai)
describe('expressjs setup', () => {
  var sandbox = sinon.createSandbox()

  afterEach(() => {
    sandbox.reset()
  })

  describe('configure middleware', () => {
    it('bodyparser is correclty configured first', () => {
      var app = express()
      var appSpy = sinon.spy(app, 'use')

      configureExpress(app)

      var callArgs = appSpy.firstCall.args
      expect((callArgs[0] as any).name).to.equal('jsonParser')
    })
  })

  describe('internal routes configuration', () => {
    it('sets up internal /status routes', (done) => {
      var app = express()
      var appMock = sinon.mock(app)
      appMock
        .expects('use')
        .atLeast(1)
        .callsFake((arg1, arg2) => {
          if (arg1 === '/status') {
            expect(arg2.name).to.eql('router')
            done()
          }
        })

      configureExpress(app)
    })
    it('sets up internal /spec routes', (done) => {
      var app = express()
      var appMock = sinon.mock(app)
      appMock
        .expects('use')
        .atLeast(1)
        .callsFake((arg1, arg2) => {
          if (arg1 === '/spec') {
            expect(arg2.name).to.eql('serveStatic')
            done()
          }
        })

      configureExpress(app)
    })
    it('sets up internal /docs routes', (done) => {
      var app = express()
      var appMock = sinon.mock(app)
      appMock
        .expects('use')
        .atLeast(1)
        .callsFake((arg1, arg2) => {
          if (arg1 === '/docs') {
            expect(arg2.name).to.eql('serveStatic')
            done()
          }
        })

      configureExpress(app)
    })
    it('sets up internal /postman.json routes', (done) => {
      var app = express()
      var appMock = sinon.mock(app)
      appMock
        .expects('use')
        .atLeast(1)
        .callsFake((arg1, arg2) => {
          if (arg1 === '/postman.json') {
            expect(arg2.name).to.eql('serveStatic')
            done()
          }
        })

      configureExpress(app)
    })
  })

  describe('custom resources', () => {
    it('register echoHandler', (done) => {
      var app = express()
      var appMock = sinon.mock(app)
      appMock
        .expects('use')
        .atLeast(1)
        .callsFake((arg1, arg2) => {
          if (arg1 === '/api/echo') {
            expect(arg2.name).to.eql('router')
            done()
          }
        })

      configureExpress(app)
    })
  })
})
