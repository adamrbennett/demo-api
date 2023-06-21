import { handler as echoHandler } from './echo/echo'
import { handler as statusHandler } from './status/status'
import bodyParser from 'body-parser'
import { Express, default as express } from 'express'

export function configureExpress(app: Express) {
  app.use(bodyParser.json())

  // health check and status endpoint
  app.use('/status', statusHandler)

  // static assets
  app.use('/spec', express.static('spec'))
  app.use('/docs', express.static('docs'))
  app.use('/postman.json', express.static('postman.json'))

  // resources
  app.use('/api/echo', echoHandler)
  return app
}
