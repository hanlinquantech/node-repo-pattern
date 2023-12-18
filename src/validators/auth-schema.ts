import Joi from 'joi'
import { ICustomerLogin } from '../interfaces/customer-interfaces'

export const AuthLoginScheam: Joi.ObjectSchema = Joi.object<{ body: ICustomerLogin }>({
	body: Joi.object({
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	})
}).unknown()
