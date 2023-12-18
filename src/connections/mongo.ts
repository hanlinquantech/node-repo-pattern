import mongoose from 'mongoose'
import config from '../config'
import { Logger } from '../services/logger'

export class MongoConnection {
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

		mongoose.connection
			.once('open', () => {
				Logger.info('MongoDB connected')
			})
			.on('error', (error: Error) => {
				Logger.error(error)
			})
			.on('disconnected', () => {
				Logger.warn('MongoDB disconnected')
			})

		this.db = await mongoose.connect(connectionString, {
			authSource: 'admin'
		})
	}

	public static async connect(): Promise<void> {
		if (
			!this.db ||
			![mongoose.ConnectionStates.connecting, mongoose.ConnectionStates.connected].includes(
				this.db.connection.readyState
			)
		) {
			this.createNewInstance()
		}
	}

	public static getDB(): mongoose.Mongoose {
		return this.db
	}
}
