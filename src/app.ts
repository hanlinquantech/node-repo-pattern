import express, { Request, Response, NextFunction, Express } from 'express'
import bodyParser from 'body-parser'
import HttpStatus from 'http-status-codes'
import routes from './routes'
import { RESPONSE_STATUS } from './utils/enums'
import cors from 'cors'
import getIP from './middlewares/ip-getter'
import { MariaConnection } from './connections/maria'
import { MongoConnection } from './connections/mongo'

MariaConnection.connect()
MongoConnection.connect()

const app: Express = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(getIP)

app.use(routes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	if (err) {
		return res.status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).send({
			status: RESPONSE_STATUS.ERROR,
			message: err.message
		})
	}

	next()
})

app.use((req: Request, res: Response) => {
	return res.status(HttpStatus.NOT_FOUND).json({
		status: RESPONSE_STATUS.ERROR,
		message: 'Request not found',
		url: req.originalUrl
	})
})

export default app
