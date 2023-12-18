import validator from '../../middlewares/validator'
import { CustomerLoginScheam } from '../../validators/customer-schema'
import { describe, expect, test, vi } from 'vitest'

const response = {
	status: vi.fn(function (number) {
		return this
	}),
	send: vi.fn(function (resPayload) {
		return resPayload
	})
}

const next = vi.fn()

describe.skip('customer-login-validation', () => {
	test('should call next function', async () => {
		const request = {
			body: {
				username: 'username',
				password: 'password'
			}
		}

		await validator(CustomerLoginScheam)(request, response, next)
		expect(next).toBeCalled()
	})

	test('should call response method when username is null', async () => {
		const request = {
			body: {
				username: null,
				password: 'password'
			}
		}

		await validator(CustomerLoginScheam)(request, response, next)
		expect(response.status).toBeCalledWith(400)
	})

	test('should call response method when password is null', async () => {
		const request = {
			body: {
				username: 'username',
				password: null
			}
		}

		await validator(CustomerLoginScheam)(request, response, next)
		expect(response.status).toBeCalledWith(400)
	})
})
