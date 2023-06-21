import { handler } from './echo'
import { default as chai, expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Request, Response } from 'express'
import { IncomingHttpHeaders } from 'http2'

chai.use(sinonChai)
// tslint:disable:no-object-literal-type-assertion

describe('echo.handler', () => {
  describe('#get', () => {
    it('should echo GET', () => {
      const headers: IncomingHttpHeaders = {} as IncomingHttpHeaders
      headers.one = '1'

      const query: any = {
        one: 1,
      }

      const req: Request = {} as Request
      req.url = '/'
      req.method = 'GET'
      req.headers = headers
      req.query = query

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => null)

      expect(res.send).to.have.been.calledWith({
        headers,
        query,
        body: undefined,
        called: `${req.method}: ${req.url}`,
      })
    })
  })

  describe('#get', () => {
    it('should echo GET', () => {
      const headers: IncomingHttpHeaders = {} as IncomingHttpHeaders
      headers.one = '1'

      const query: any = {
        one: 1,
      }

      const req: Request = {} as Request
      req.url = '/100'
      req.method = 'GET'
      req.headers = headers
      req.query = query
      req.params = {
        id: '100',
      }

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => null)

      expect(res.send).to.have.been.calledWith({
        headers,
        query,
        called: `${req.method}: ${req.url}`,
        body: undefined,
      })
    })
  })

  describe('#put', () => {
    it('should echo PUT', () => {
      const headers: IncomingHttpHeaders = {} as IncomingHttpHeaders
      headers.one = '1'

      const query: any = {
        one: 1,
      }

      const body: any = {
        one: 1,
      }

      const req: Request = {} as Request
      req.url = '/100'
      req.method = 'PUT'
      req.headers = headers
      req.query = query
      req.body = body
      req.params = {
        id: '100',
      }

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => null)

      expect(res.send).to.have.been.calledWith({
        headers,
        query,
        body,
        called: `${req.method}: ${req.url}`,
      })
    })
  })

  describe('#post', () => {
    it('should echo POST', () => {
      const headers: IncomingHttpHeaders = {} as IncomingHttpHeaders
      headers.one = '1'

      const query: any = {
        one: 1,
      }

      const body: any = {
        one: 1,
      }

      const req: Request = {} as Request
      req.url = '/100'
      req.method = 'POST'
      req.headers = headers
      req.query = query
      req.body = body
      req.params = {
        id: '100',
      }

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => null)

      expect(res.send).to.have.been.calledWith({
        headers,
        query,
        body,
        called: `${req.method}: ${req.url}`,
      })
    })
  })

  describe('#delete', () => {
    it('should echo DELETE', () => {
      const headers: IncomingHttpHeaders = {} as IncomingHttpHeaders
      headers.one = '1'

      const query: any = {
        one: 1,
      }

      const req: Request = {} as Request
      req.url = '/100'
      req.method = 'DELETE'
      req.headers = headers
      req.query = query
      req.params = {
        id: '100',
      }

      const res: Response = {} as Response
      res.send = sinon.spy()

      handler(req, res, () => null)

      expect(res.send).to.have.been.calledWith({
        headers,
        query,
        called: `${req.method}: ${req.url}`,
        body: undefined,
      })
    })
  })
})
