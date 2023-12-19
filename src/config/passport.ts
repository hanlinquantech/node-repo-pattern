import passport from 'passport'
import passportLocal from 'passport-local'
import { compare } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import { Logger } from '../services/logger'
import { IAuthCustomer } from '../interfaces/customer-interfaces'
import { RESPONSE_STATUS } from '../utils/enums'
import { StatusCodes } from 'http-status-codes'
import { Customers } from '../tlibrary/typeorm-models/customer-model'
import { customerToAuthMapper } from '../mappers/customer-mappers'
import { TRepository } from '../tlibrary/base-repository'
import { MongoRepository } from '../tlibrary/mongo-repository'
import CustomerModel from '../tlibrary/mongo-models/customer-model'

const customerRepository: TRepository<Customers> = new MongoRepository(CustomerModel)

passport.serializeUser<any, any>((req, user, done) => {
	done(undefined, user)
})

passport.use(
	new passportLocal.Strategy(
		{ usernameField: 'username', passwordField: 'password' },
		async (username: string, password: string, done: any) => {
			try {
				const customer = await customerRepository.findOne({ user: username })
				if (!customer) return done(undefined, false, { message: 'Customer not found.' })

				const isMatch = await compare(password, customer?.password ?? '')
				if (!isMatch) return done(undefined, false, { message: 'Invalid email or password.' })

				const authCustomer = customerToAuthMapper().map<Customers, IAuthCustomer>(
					customer,
					'Customers',
					'IAuthCustomer'
				)
				return done(undefined, authCustomer)
			} catch (err: any) {
				Logger.error(err)
				return done(err, false)
			}
		}
	)
)

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	return passport.authenticate('local', (err: any, user: IAuthCustomer, info: any) => {
		if (err) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				status: RESPONSE_STATUS.ERROR,
				message: err.message
			})
		}
		if (info?.message) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: RESPONSE_STATUS.ERROR,
				message: info?.message
			})
		}
		req.user = { ...user, ip: req.headers.ip } as IAuthCustomer
		next()
	})(req, res, next)
}
