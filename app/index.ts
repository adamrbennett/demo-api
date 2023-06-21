import { configureExpress } from './configureExpress'
import { default as http } from 'http'
import { default as express } from 'express'
import { log } from '../lib/logging'
import { errorHandler } from '../lib/errors'
import config from 'config'

let server
const port = 3000

try {
  log.info('Starting up env ' + config.get('name'))
  var app = express()
  app = configureExpress(app)
  app.use(errorHandler)

  server = http.createServer(app)
  prepareServer(process, server)

  server.listen(port)
} catch (err) {
  /* istanbul ignore next */
  exitWithLogMessage(err)
}

export { prepareServer, server }

function prepareServer(proc: NodeJS.Process, svr: http.Server) {
  svr.on('error', exitWithLogMessage)
  svr.on('listening', onListening(svr))

  proc.on('unhandledRejection', exitWithLogMessage)
  proc.on('uncaughtException', exitWithLogMessage)
  proc.on('SIGINT', exitNormal('SIGINT', svr))
  proc.on('SIGTERM', exitNormal('SIGTERM', svr))
}

function exitNormal(signal: string, svr: http.Server) {
  return () => {
    log.warn(`${signal} received, shutting down`)
    svr.close(
      /* istanbul ignore next */ () => {
        log.info('Shutdown complete')
        process.exit(0)
      }
    )
  }
}

function exitWithLogMessage(error: any) {
  var message = getErrorMessage(error)
  log.error(message)
  process.exit(1)
}

function getErrorMessage(error: any) {
  var messages: { [key: string]: string } = {
    EACCES: 'requires elevated privileges',
    EADDRINUSE: 'is already in use',
  }
  var message = messages[error.code] || error.message || error.code
  return message
}

function onListening(svr: http.Server) {
  return () => {
    var addr = svr.address()
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
    log.info('Listening on ' + bind)
  }
}
