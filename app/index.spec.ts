import { expect } from 'chai'
import supertest from 'supertest'
import 'mocha'
import sinon, { SinonSandbox, SinonStub, SinonSpy } from 'sinon'
import { Server } from 'http'

describe('api', () => {
  let server: Server

  beforeEach(async () => {
    process.env.NODE_ENV = 'test' // use test config
    server = (await import('./index')).server
  })

  afterEach(() => {
    server.close()
  })

  it('should respond to status requests', async () => {
    const response = await supertest(server).get('/status')
    const body = response.body
    expect(response.status).to.equal(200)
    expect(body).to.be.an('object')
    expect(body).to.haveOwnProperty('status')
    expect(body).to.haveOwnProperty('version')
    expect(body).to.haveOwnProperty('build')
    expect(body).to.haveOwnProperty('commit')
    expect(body).to.haveOwnProperty('config')
  })

  it('should respond to docs requests', async () => {
    const response = await supertest(server).get('/docs')
    expect(response.status).to.be.lessThan(400)
  })

  it('should respond to echo requests', async () => {
    const response = await supertest(server).get('/api/echo')
    expect(response.status).to.equal(200)
    expect(response.body).to.be.an('object')
  })
})

describe('server', () => {
  let server: Server
  let sandbox: SinonSandbox
  let closeStub: SinonStub
  let exitStub: SinonStub

  beforeEach(async () => {
    server = (await import('./index')).server
    sandbox = sinon.createSandbox({ useFakeTimers: true })
    closeStub = sandbox.stub(server, 'close')
    exitStub = sandbox.stub(process, 'exit')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should shutdown on SIGTERM', (done) => {
    process.once('SIGTERM', () => {
      sinon.assert.called(closeStub)
      done()
    })
    process.kill(process.pid, 'SIGTERM')
  })

  it('should exit on error', (done) => {
    server.once('error', () => {
      sinon.assert.called(exitStub)
      done()
    })
    server.emit('error', new Error())
  })
})
