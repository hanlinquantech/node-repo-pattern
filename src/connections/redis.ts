import * as redis from 'redis'
import config from '../config/index'
import { Logger } from '../services/logger'

const databaseNo = config.REDIS.DB_NUMBER!
const username = config.REDIS.USER
const password = config.REDIS.PASS
const host = config.REDIS.HOST
const port = config.REDIS.PORT

let url = `redis://${username}${password ? `:${password}` : ''}@${host}${port ? `:${port}` : ''}`

const client = redis.createClient({ url })

client.connect()

client.on('connect', () => {
	client.select(databaseNo)
	Logger.info('Connected to Redis')
})

client.on('error', (err: Error) => {
	Logger.error(err)
})

client.on('ready', () => {
	Logger.info('Redis connection esablished')
})

export type RedisClientType = typeof client

export default client
