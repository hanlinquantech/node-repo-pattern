import 'dotenv/config'

export default {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	LOG_DIR: process.env.LOG_DIR,
	LOG_FILE_SIZE: process.env.LOG_FILE_SIZE,
	DB_TYPE: process.env.DB_TYPE,
	LOGIN_REDIRECT_URL: process.env.LOGIN_REDIRECT_URL,
	LOGIN_ID_CACHE_EXP: Number(process.env.LOGIN_ID_CACHE_EXP) || 1,
	MONGO: {
		URL: process.env.MONGO_DB_URL,
		HOST: process.env.MONGO_DB_HOST,
		PORT: Number(process.env.MONGO_DB_PORT) || 27017,
		USER: process.env.MONGO_DB_USER,
		PASS: process.env.MONGO_DB_PASS,
		NAME: process.env.MONGO_DB_NAME
	},
	REDIS: {
		URL: process.env.REDIS_URL,
		HOST: process.env.REDIS_HOST,
		PORT: Number(process.env.REDIS_PORT) || 6379,
		USER: process.env.REDIS_USER,
		PASS: process.env.REDIS_PASS,
		DB_NUMBER: Number(process.env.REDIS_DATABASE_NUMBER) || 1
	},
	MARIA: {
		URL: process.env.MARIA_DB_URL,
		HOST: process.env.MARIA_DB_HOST,
		PORT: Number(process.env.MARIA_DB_PORT) || 3306,
		USER: process.env.MARIA_DB_USER,
		PASS: process.env.MARIA_DB_PASS,
		NAME: process.env.MARIA_DB_NAME
	}
}
