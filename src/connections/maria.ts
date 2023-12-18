import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Customers } from '../tlibrary/typeorm-models/customer-model'
import config from '../config'
import { Logger } from '../services/logger'

// const AppDataSource = new DataSource({
// 	type: 'mariadb',
// 	host: config.MARIA.HOST,
// 	port: config.MARIA.PORT,
// 	username: config.MARIA.USER,
// 	password: config.MARIA.PASS,
// 	database: config.MARIA.NAME,
// 	entities: [Customers],
// 	logging: false
// })

// AppDataSource.initialize()
// 	.then(() => {
// 		Logger.info(`${config.DB_TYPE} connected`)
// 	})
// 	.catch(error => Logger.error(error))

// export { AppDataSource }

export class MariaConnection {
	private static db: DataSource

	private static async createNewInstance() {
		const AppDataSource = new DataSource({
			type: 'mariadb',
			host: config.MARIA.HOST,
			port: config.MARIA.PORT,
			username: config.MARIA.USER,
			password: config.MARIA.PASS,
			database: config.MARIA.NAME,
			entities: [Customers],
			logging: false
		})

		try {
			this.db = await AppDataSource.initialize()
			Logger.info(`MariaDB connected`)
		} catch (error: any) {
			Logger.error(error)
		}
	}

	public static async connect() {
		if (!this.db || !this.db.isInitialized) {
			return this.createNewInstance()
		}
		return this.db
	}
}