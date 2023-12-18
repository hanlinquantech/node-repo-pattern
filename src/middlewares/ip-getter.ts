import { NextFunction, Request, Response } from 'express'

const getIP = function (req: Request, res: Response, next: NextFunction) {
    req.headers.ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || '127.0.0.1'
	next()
}

export default getIP
