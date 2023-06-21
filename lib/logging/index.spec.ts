import { describe, it, beforeEach, afterEach } from 'mocha'
import { default as sinon, SinonSandbox } from 'sinon'
import { default as chai, expect } from 'chai'
import { default as express } from 'express'
import { default as supertest } from 'supertest'
import { default as sinonChai } from 'sinon-chai'
import { default as mockRequire } from 'mock-require'
import { Format } from 'logform'

// tslint:disable-next-line:no-var-requires
const clearModule = require('clear-module')
const logLevels = ['debug', 'info', 'warn', 'error']

chai.use(sinonChai)

describe('log', () => {
  describe('with defaults', () => {
    it('should use default log level', async () => {
      const { log } = await import('./index')
      expect(log.level).to.equal('info')
    })
  })

  describe('with config', () => {
    let sandbox: SinonSandbox

    beforeEach(() => {
      clearModule('./index')
    })

    it('should use configured log level', async () => {
      let fakeConfig = { get: () => 'foo', has: () => true }
      mockRequire('config', fakeConfig)

      const { log } = await import('./index')
      expect(log.level).to.equal('foo')
    })

    logLevels.map((level: string) => {
      it(`should log ${level}`, async () => {
        let fakeConfig = {
          get: () => {
            return { level }
          },
          has: () => true
        }

        mockRequire('config', fakeConfig)

        const { log } = await import('./index')
        log.addListener('close', () => {
          throw new Error(`${level} message incorrectly logged`)
        })
        ;(log as any)[level]('test')
      })
    })

    it('should use configured log format', async () => {
      let fakeConfig = { get: () => 'dev', has: () => true }
      mockRequire('config', fakeConfig)

      const { log } = await import('./index')
      // tslint:disable:no-unused-expression
      expect(log.format).to.not.be.null
    })
  })
})

describe('logging', () => {
  beforeEach(() => {
    clearModule('./index')
  })

  describe('with defaults', () => {
    it('should use request logging', async () => {
      const { log, requestLogger } = await import('./index')
      const infoSpy = sinon.spy(log, 'info')

      const app = express()
      app.use(requestLogger(log))

      return supertest(app)
        .get('/')
        .expect((res: supertest.Request) => {
          expect(infoSpy).to.have.been.calledWith(
            'Request',
            sinon.match({
              remote_addr: '::ffff:127.0.0.1',
              method: 'GET',
              url: '/'
            })
          )
        })
    })
  })
})
