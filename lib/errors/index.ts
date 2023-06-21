import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import { Logger } from 'winston'
import { IAppError } from './IAppError'
// tslint:disable:max-classes-per-file

export class BadRequest implements IAppError {
  constructor(public message: string) {}
  name = 'BadRequest'
  error = 'Bad Request'
  statusCode = 400
}

export class Unauthorized implements IAppError {
  constructor(public message: string) {}
  name = 'Unauthorized'
  error = 'Unauthorized'
  statusCode = 401
}

export class Forbidden implements IAppError {
  constructor(public message: string) {}
  name = 'Forbidden'
  error = 'Forbidden'
  statusCode = 403
}

export class NotFound implements IAppError {
  constructor(public message: string) {}
  name = 'NotFound'
  error = 'Not Found'
  statusCode = 404
}

export class MethodNotAllowed implements IAppError {
  constructor(public message: string) {}
  name = 'MethodNotAllowed'
  error = 'Method Not Allowed'
  statusCode = 405
}

export class NotAcceptable implements IAppError {
  constructor(public message: string) {}
  name = 'NotAcceptable'
  error = 'Not Acceptable'
  statusCode = 406
}

export class ProxyAuthenticationRequired implements IAppError {
  constructor(public message: string) {}
  name = 'ProxyAuthenticationRequired'
  error = 'Proxy Authentication Required'
  statusCode = 407
}

export class RequestTimeout implements IAppError {
  constructor(public message: string) {}
  name = 'RequestTimeout'
  error = 'Request Timeout'
  statusCode = 408
}

export class Conflict implements IAppError {
  constructor(public message: string) {}
  name = 'Conflict'
  error = 'Conflict'
  statusCode = 409
}

export class Gone implements IAppError {
  constructor(public message: string) {}
  name = 'Gone'
  error = 'Gone'
  statusCode = 410
}

export class LengthRequired implements IAppError {
  constructor(public message: string) {}
  name = 'LengthRequired'
  error = 'Length Required'
  statusCode = 411
}

export class PreconditionFailed implements IAppError {
  constructor(public message: string) {}
  name = 'PreconditionFailed'
  error = 'Precondition Failed'
  statusCode = 412
}

export class PayloadTooLarge implements IAppError {
  constructor(public message: string) {}
  name = 'PayloadTooLarge'
  error = 'Payload Too Large'
  statusCode = 413
}

export class URITooLong implements IAppError {
  constructor(public message: string) {}
  name = 'URITooLong'
  error = 'URI Too Long'
  statusCode = 414
}

export class UnsupportedMediaType implements IAppError {
  constructor(public message: string) {}
  name = 'UnsupportedMediaType'
  error = 'Unsupported Media Type'
  statusCode = 415
}

export class RequestedRangeNotSatisfiable implements IAppError {
  constructor(public message: string) {}
  name = 'RequestedRangeNotSatisfiable'
  error = 'Requested Range Not Satisfiable'
  statusCode = 416
}

export class ExpectationFailed implements IAppError {
  constructor(public message: string) {}
  name = 'ExpectationFailed'
  error = 'Expectation Failed'
  statusCode = 417
}

export class Teapot implements IAppError {
  constructor(public message: string) {}
  name = 'Teapot'
  error = "I'm a Teapot"
  statusCode = 418
}

export class MisdirectedRequest implements IAppError {
  constructor(public message: string) {}
  name = 'MisdirectedRequest'
  error = 'Misdirected Request'
  statusCode = 421
}

export class UnprocessableEntity implements IAppError {
  constructor(public message: string) {}
  name = 'UnprocessableEntity'
  error = 'Unproessable Entity'
  statusCode = 422
}

export class Locked implements IAppError {
  constructor(public message: string) {}
  name = 'Locked'
  error = 'Locked'
  statusCode = 423
}

export class FailedDependency implements IAppError {
  constructor(public message: string) {}
  name = 'FailedDependency'
  error = 'Failed Dependency'
  statusCode = 424
}

export class TooEarly implements IAppError {
  constructor(public message: string) {}
  name = 'TooEarly'
  error = 'Too Early'
  statusCode = 425
}

export class UpgradeRequired implements IAppError {
  constructor(public message: string) {}
  name = 'UpgradeRequired'
  error = 'Upgrade Required'
  statusCode = 426
}

export class PreconditionRequired implements IAppError {
  constructor(public message: string) {}
  name = 'PreconditionRequired'
  error = 'Precondition Required'
  statusCode = 428
}

export class TooManyRequests implements IAppError {
  constructor(public message: string) {}
  name = 'TooManyRequests'
  error = 'Too Many Requests'
  statusCode = 429
}

export class RequestHeaderFieldsTooLarge implements IAppError {
  constructor(public message: string) {}
  name = 'RequestHeaderFieldsTooLarge'
  error = 'Request Header Fields Too Large'
  statusCode = 431
}

export class UnavailableForLegalReasons implements IAppError {
  constructor(public message: string) {}
  name = 'UnavailableForLegalReasons'
  error = 'Unavailable For Legal Reasons'
  statusCode = 451
}

export class InternalServerError implements IAppError {
  constructor(public message: string) {}
  name = 'InternalServerError'
  error = 'Internal Server Error'
  statusCode = 500
}

export class NotImplemented implements IAppError {
  constructor(public message: string) {}
  name = 'NotImplemented'
  error = 'Not Implemented'
  statusCode = 501
}

export class BadGateway implements IAppError {
  constructor(public message: string) {}
  name = 'BadGateway'
  error = 'Bad Gateway'
  statusCode = 502
}

export class ServiceUnavailable implements IAppError {
  constructor(public message: string) {}
  name = 'ServiceUnavailable'
  error = 'Service Unavailable'
  statusCode = 503
}

export class GatewayTimeout implements IAppError {
  constructor(public message: string) {}
  name = 'GatewayTimeout'
  error = 'Gateway Timeout'
  statusCode = 504
}

export class HTTPVersionNotSupported implements IAppError {
  constructor(public message: string) {}
  name = 'HTTPVersionNotSupported'
  error = 'HTTP Version Not Supported'
  statusCode = 505
}

export class VariantAlsoNegotiates implements IAppError {
  constructor(public message: string) {}
  name = 'VariantAlsoNegotiates'
  error = 'Variant Also Negotiates'
  statusCode = 506
}

export class InsufficientStorage implements IAppError {
  constructor(public message: string) {}
  name = 'InsufficientStorage'
  error = 'Insufficient Storage'
  statusCode = 507
}

export class LoopDetected implements IAppError {
  constructor(public message: string) {}
  name = 'LoopDetected'
  error = 'Loop Detected'
  statusCode = 508
}

export class NotExtended implements IAppError {
  constructor(public message: string) {}
  name = 'NotExtended'
  error = 'Not Extended'
  statusCode = 510
}

export class NetworkAuthenticationRequired implements IAppError {
  constructor(public message: string) {}
  name = 'NetworkAuthenticationRequired'
  error = 'Network Authentication Required'
  statusCode = 511
}

export function errorHandler(log?: Logger): ErrorRequestHandler {
  return (err: IAppError, req: Request, res: Response, next: NextFunction) => {
    // default to status code 500
    err.statusCode = err.statusCode || 500

    if (err.statusCode >= 500 && log) {
      log.error(err.message, err)
    }
    res.status(err.statusCode).json({
      error: err.error,
      statusCode: err.statusCode,
      message: err.message
    })
    next()
  }
}
