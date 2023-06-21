import { handler } from './status'
import { default as chai, assert, expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Request, Response, Router } from 'express'

chai.use(sinonChai)
// tslint:disable:no-object-literal-type-assertion

describe('status.handler', () => {
  describe('#get', () => {
    let sandbox: sinon.SinonSandbox
    before(async () => {
      sandbox = sinon.createSandbox()
    })

    beforeEach(() => {
      sandbox.restore()
    })

    it('should return status with build number and commit hash', async () => {
      sandbox.stub(process, 'env').value({
        BUILD_NUMBER: '123',
        COMMIT_HASH: 'abc123',
        npm_package_version: process.env.npm_package_version,
      })

      const req: Request = {} as Request
      req.method = 'GET'
      req.url = '/'

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => {
        assert.fail()
      })

      const status = {
        build: '123',
        commit: 'abc123',
      }

      expect(res.send).to.have.been.calledWith(sinon.match(status))
    })

    it('should return status with unknown build number and commit hash', async () => {
      sandbox.stub(process, 'env').value({
        npm_package_version: process.env.npm_package_version,
      })

      const req: Request = {} as Request
      req.method = 'GET'
      req.url = '/'

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => {
        assert.fail()
      })

      const status = {
        build: 'Unknown',
        commit: 'Unknown',
      }

      expect(res.send).to.have.been.calledWith(sinon.match(status))
    })
  })
})
