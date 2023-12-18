import mongoose from 'mongoose'
import config from '../config'
import { Logger } from '../services/logger'

// mongoose.Promise = global.Promise
// const username = config.MONGO.USER
// const password = config.MONGO.PASS
// const host = config.MONGO.HOST
// const port = config.MONGO.PORT
// const dbName = config.MONGO.NAME

// let connectionString = `mongodb://${username}:${password}@${host}${port ? `:${port}` : ''}/${dbName}`

// if (process.env.CI) {
// 	connectionString = `mongodb://${host}${port ? `:${port}` : ''}/${dbName}`
// }

// mongoose.connect(connectionString, {
// 	authSource: 'admin'
// })

// mongoose.connection
// 	.once('open', () => {
// 		Logger.info('Connection has been made')
// 	})
// 	.on('error', (error: Error) => {
// 		Logger.error(error)
// 	})
// 	.on('disconnected', () => {
// 		Logger.warn('Connection disconnected')
// 	})

export class MongooseConnection {
	private static db: mongoose.Mongoose

	private static async createNewInstance() {
		mongoose.Promise = global.Promise
		const username = config.MONGO.USER
		const password = config.MONGO.PASS
		const host = config.MONGO.HOST
		const port = config.MONGO.PORT
		const dbName = config.MONGO.NAME

		let connectionString = `mongodb://${username}:${password}@${host}${port ? `:${port}` : ''}/${dbName}`

		if (process.env.CI) {
			connectionString = `mongodb://${host}${port ? `:${port}` : ''}/${dbName}`
		}

		this.db = await mongoose.connect(connectionString, {
			authSource: 'admin'
		})

		this.db.connection
			.once('open', () => {
				Logger.info('Connection has been made')
			})
			.on('error', (error: Error) => {
				Logger.error(error)
			})
			.on('disconnected', () => {
				Logger.warn('Connection disconnected')
			})
	}

	public static async connect() {
		if (
			!this.db ||
			![mongoose.ConnectionStates.connecting, mongoose.ConnectionStates.connected].includes(
				this.db.connection.readyState
			)
		) {
			return this.createNewInstance()
		}
		return this.db
	}
}

// export default mongoose
