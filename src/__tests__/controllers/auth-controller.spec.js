import { describe, test, vi, expect, afterEach, beforeEach } from 'vitest'
import {
	checkUserExists,
	login,
	refreshToken,
	register,
	updateUserProfile
} from '../../controllers/customer-controller'

vi.mock('../../services/customer')
const response = {
	statusCode: 0,
	status: vi.fn(function (number) {
		this.statusCode = number
		return this
	}),
	send: vi.fn(function (resPayload) {
		return resPayload
	})
}

const request = {
	user: {
		username: 'testuser'
	},
	body: {
		username: 'testuser'
	}
}

const next = vi.fn()

describe('login controller', () => {
	// afterEach(() => {
	// 	request.user.username = 'testuser'
	// })

	// test('should call next function with error when auth user is not existed in request', async () => {
	// 	delete request.user.username

	// 	await login(request, response, next)

	// 	expect(next).toBeCalled()
	// })

	// test('should call next function with error when throw an exception', async () => {
	// 	response.status.mockImplementationOnce(function () {
	// 		throw new Error('Test error')
	// 	})

	// 	await login(request, response, next)

	// 	expect(next).toBeCalled()
	// })

	// test('should return by calling response methods for success process', async () => {
	// 	await login(request, response, next)

	// 	expect(response.status).toBeCalledWith(200)
	// })
})

