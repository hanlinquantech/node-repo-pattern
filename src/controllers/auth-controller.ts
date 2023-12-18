import { Request, Response, NextFunction } from 'express'
import HttpStatus from 'http-status-codes'
import HttpErrors from 'http-errors'
import {
	authLogin
} from '../services/auth'
import { Logger } from '../services/logger'
import { IAuthCustomer } from '../interfaces/customer-interfaces'
import config from '../config'

export const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authCustomer = req.user as IAuthCustomer
		if (!authCustomer || !authCustomer.user) {
			return next(HttpErrors(HttpStatus.UNAUTHORIZED, 'Unauthorized.'))
		}
		const loginId = await authLogin(authCustomer)

		return res.redirect(`${config.LOGIN_REDIRECT_URL}?login_id=${loginId}`)
	} catch (err: any) {
		Logger.error(err)
		next(HttpErrors(HttpStatus.INTERNAL_SERVER_ERROR, err))
	}
}
