import { default as config } from 'config'
import { default as morgan } from 'morgan'
import { RequestHandler } from 'express'
import { createLogger, format, transports, Logger } from 'winston'
import { LogStream } from './LogStream'

var levelName = 'silly'
var formatName = 'json'

/* istanbul ignore else */
if (config.has('log.level')) {
  levelName = config.get<string>('log.level')
}

if (config.has('log.format')) {
  formatName = config.get<string>('log.format')
}

var winstonFormat = getFormatFromName(formatName)

export var log = createLogger({
  format: winstonFormat,
  level: levelName,
  transports: [new transports.Console()]
})

export function requestLogger(logger: Logger): RequestHandler {
  return morgan(
    '{"remote_addr": ":remote-addr", "remote_user": ":remote-user", ' +
      '"date": ":date[clf]", "method": ":method", "url": ":url", ' +
      '"http_version": ":http-version", "status": ":status", ' +
      '"result_length": ":res[content-length]", "referrer": ":referrer", ' +
      '"user_agent": ":user-agent", "response_time": ":response-time"}',
    {
      stream: new LogStream('Request', logger)
    }
  )
}

function getFormatFromName(name: string) {
  switch (name) {
    case 'dev':
      return format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf(info => `${info.timestamp} ${info.level} ${info.message}`)
      )
    case 'json':
      return format.json()
    default:
      // tslint:disable-next-line:no-console
      console.log(
        `{"message":"Found invalid log.format value '${name}',` +
          ` defaulting to json", "level":"warn"}`
      )
      return format.json()
  }
}
