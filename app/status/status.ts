import config from 'config'
import { Router, Response, Request, NextFunction } from 'express'

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
  const status = {
    status: 'Healthy',
    version: process.env.npm_package_version,
    build: process.env.BUILD_NUMBER || 'Unknown',
    commit: process.env.COMMIT_HASH || 'Unknown',
    config: config.get('name'),
  }

  res.send(status)
})

export { router as handler }
