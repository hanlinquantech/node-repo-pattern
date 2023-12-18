import { IAuthCustomer } from '../interfaces/customer-interfaces'
import HttpErrors from 'http-errors'
import HttpStatus from 'http-status-codes'
import { Customers } from '../tlibrary/typeorm-models/customer-model'
import { v4 } from 'uuid'
import client from '../connections/redis'
import config from '../config'
import { TRepository } from '../tlibrary/base-repository'
import { MongoRepository } from '../tlibrary/mongo-repository'
import CustomerModel from '../tlibrary/mongo-models/customer-model'

const customerRepository: TRepository<Customers> = new MongoRepository(CustomerModel)

export const authLogin = async (payload: IAuthCustomer): Promise<string> => {
	const customer = await customerRepository.findOne({ user: payload.user })
	if (!customer) {
		throw HttpErrors(HttpStatus.INTERNAL_SERVER_ERROR, `Auth user not found.`)
	}

	customer.loginCount = (customer.loginCount ?? 0) + 1
	await customerRepository.update(customer.id, customer)

	const loginId = v4()
	await client.SETEX(
		loginId,
		config.LOGIN_ID_CACHE_EXP * 60,
		JSON.stringify({ ...payload, loginCount: customer.loginCount } as IAuthCustomer)
	)

	return loginId
}
