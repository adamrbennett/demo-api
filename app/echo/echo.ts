import { Router, Response, Request, NextFunction } from 'express'

const router: Router = Router()

router.all('/', (req: Request, res: Response, next: NextFunction) => {
  return res.send({
    called: `${req.method}: /`,
    headers: req.headers,
    query: req.query,
    body: req.body,
  })
})

router.all('/:path', (req: Request, res: Response, next: NextFunction) => {
  return res.send({
    called: `${req.method}: /${req.params.path}`,
    headers: req.headers,
    query: req.query,
    body: req.body,
  })
})

export { router as handler }
