import { describe, it, beforeEach, afterEach } from 'mocha'
import { default as sinon, SinonSandbox, SinonSpy } from 'sinon'
import { default as chai, expect } from 'chai'
import { default as express } from 'express'
import { default as supertest } from 'supertest'
import { default as sinonChai } from 'sinon-chai'
import { log } from '../logging'
import { IAppError } from './IAppError'

import {
  BadRequest,
  errorHandler,
  InternalServerError,
  Unauthorized,
  Forbidden,
  NotFound,
  MethodNotAllowed,
  NotAcceptable,
  Conflict,
  ProxyAuthenticationRequired,
  RequestTimeout,
  Gone,
  LengthRequired,
  PreconditionFailed,
  PayloadTooLarge,
  URITooLong,
  UnsupportedMediaType,
  RequestedRangeNotSatisfiable,
  ExpectationFailed,
  Teapot,
  MisdirectedRequest,
  UnprocessableEntity,
  Locked,
  FailedDependency,
  TooEarly,
  UpgradeRequired,
  PreconditionRequired,
  TooManyRequests,
  RequestHeaderFieldsTooLarge,
  UnavailableForLegalReasons,
  NotImplemented,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
  HTTPVersionNotSupported,
  VariantAlsoNegotiates,
  InsufficientStorage,
  LoopDetected,
  NotExtended,
  NetworkAuthenticationRequired
} from './index'
log.silent = true

chai.use(sinonChai)

describe('errors', () => {
  const errors = [
    { class: BadRequest, error: 'Bad Request', statusCode: 400 },
    { class: Unauthorized, error: 'Unauthorized', statusCode: 401 },
    { class: Forbidden, error: 'Forbidden', statusCode: 403 },
    { class: NotFound, error: 'Not Found', statusCode: 404 },
    { class: MethodNotAllowed, error: 'Method Not Allowed', statusCode: 405 },
    { class: NotAcceptable, error: 'Not Acceptable', statusCode: 406 },
    {
      class: ProxyAuthenticationRequired,
      error: 'Proxy Authentication Required',
      statusCode: 407
    },
    { class: RequestTimeout, error: 'Request Timeout', statusCode: 408 },
    { class: Conflict, error: 'Conflict', statusCode: 409 },
    { class: Gone, error: 'Gone', statusCode: 410 },
    { class: LengthRequired, error: 'Length Required', statusCode: 411 },
    {
      class: PreconditionFailed,
      error: 'Precondition Failed',
      statusCode: 412
    },
    { class: PayloadTooLarge, error: 'Payload Too Large', statusCode: 413 },
    { class: URITooLong, error: 'URI Too Long', statusCode: 414 },
    {
      class: UnsupportedMediaType,
      error: 'Unsupported Media Type',
      statusCode: 415
    },
    {
      class: RequestedRangeNotSatisfiable,
      error: 'Requested Range Not Satisfiable',
      statusCode: 416
    },
    { class: ExpectationFailed, error: 'Expectation Failed', statusCode: 417 },
    { class: Teapot, error: "I'm a Teapot", statusCode: 418 },
    {
      class: MisdirectedRequest,
      error: 'Misdirected Request',
      statusCode: 421
    },
    {
      class: UnprocessableEntity,
      error: 'Unproessable Entity',
      statusCode: 422
    },
    { class: Locked, error: 'Locked', statusCode: 423 },
    { class: FailedDependency, error: 'Failed Dependency', statusCode: 424 },
    { class: TooEarly, error: 'Too Early', statusCode: 425 },
    { class: UpgradeRequired, error: 'Upgrade Required', statusCode: 426 },
    {
      class: PreconditionRequired,
      error: 'Precondition Required',
      statusCode: 428
    },
    { class: TooManyRequests, error: 'Too Many Requests', statusCode: 429 },
    {
      class: RequestHeaderFieldsTooLarge,
      error: 'Request Header Fields Too Large',
      statusCode: 431
    },
    {
      class: UnavailableForLegalReasons,
      error: 'Unavailable For Legal Reasons',
      statusCode: 451
    },
    {
      class: InternalServerError,
      error: 'Internal Server Error',
      statusCode: 500
    },
    { class: NotImplemented, error: 'Not Implemented', statusCode: 501 },
    { class: BadGateway, error: 'Bad Gateway', statusCode: 502 },
    {
      class: ServiceUnavailable,
      error: 'Service Unavailable',
      statusCode: 503
    },
    { class: GatewayTimeout, error: 'Gateway Timeout', statusCode: 504 },
    {
      class: HTTPVersionNotSupported,
      error: 'HTTP Version Not Supported',
      statusCode: 505
    },
    {
      class: VariantAlsoNegotiates,
      error: 'Variant Also Negotiates',
      statusCode: 506
    },
    {
      class: InsufficientStorage,
      error: 'Insufficient Storage',
      statusCode: 507
    },
    { class: LoopDetected, error: 'Loop Detected', statusCode: 508 },
    { class: NotExtended, error: 'Not Extended', statusCode: 510 },
    {
      class: NetworkAuthenticationRequired,
      error: 'Network Authentication Required',
      statusCode: 511
    }
  ]

  for (const error of errors) {
    it(error.error, () => {
      const err: IAppError = new error.class('test message')

      expect(err)
        .to.haveOwnProperty('error')
        .and.to.equal(error.error)
      expect(err)
        .to.haveOwnProperty('statusCode')
        .and.to.equal(error.statusCode)
      expect(err)
        .to.haveOwnProperty('message')
        .and.to.equal('test message')
    })
  }
})

describe('error handler', () => {
  let sandbox: SinonSandbox

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should handle errors', () => {
    const app = express()

    app.use((req, res, next) => {
      throw new BadRequest('test')
    })
    app.use(errorHandler())

    return supertest(app)
      .get('/')
      .expect(400)
  })

  it('should default status code to 500 when none present', () => {
    const app = express()

    app.use((req, res, next) => {
      throw new Error('test')
    })
    app.use(errorHandler())

    return supertest(app)
      .get('/')
      .expect(500)
  })

  it('should log server errors', () => {
    const app = express()

    const logSpy: SinonSpy = sandbox.spy(log, 'error')

    app.use((req, res, next) => {
      throw new InternalServerError('test error')
    })
    app.use(errorHandler(log))

    return supertest(app)
      .get('/')
      .expect(500)
      .then(() => {
        expect(logSpy).to.have.been.calledWith('test error')
      })
  })

  it('should not log client errors', () => {
    const app = express()

    const logSpy: SinonSpy = sandbox.spy(log, 'error')

    app.use((req, res, next) => {
      throw new BadRequest('test error')
    })
    app.use(errorHandler(log))

    return supertest(app)
      .get('/')
      .expect(400)
      .then(() => {
        // tslint:disable-next-line:no-unused-expression
        expect(logSpy).to.not.have.been.called
      })
  })
})
