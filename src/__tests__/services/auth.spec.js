import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { checkCustomerExists, createCustomer, login, refreshAccessToken, updateCustomer } from '../../services/customer'
import CustomerModel from '../../models/customer-model'
import mongoose from 'mongoose'
import { verify } from 'jsonwebtoken'
import config from '../../config'
import { MongoMemoryServer } from 'mongodb-memory-server'
import counterSeed from '../../seeds/counter-seed'
import configSeed from '../../seeds/config-seed'
import { PRICE_CREDIT } from '../../utils/constants'

const customerData = {
	username: 'testuser@gmail.com',
	fullname: 'testuser',
	phone: '08412345672;0987654322',
	email: 'testuser@gmail.com',
	loginCount: 5,
	popupCount: 0,
	bankList: '',
	userLastUpdate: '2023-08-17T04:40:02.660Z',
	id: 27
}

let registerPayload = {
	aff_id: '',
	credit_rate: '100',
	txtname: 'testuser',
	txtpass: '123452',
	txtpass_repeat: '123452',
	txtphone: '08412345672',
	txtphone2: '0987654322',
	txtuser: 'testuser@gmail.com'
}

let mongoServer

describe('login(payload: IAuthCustomer)', () => {
    // beforeAll(async () => {
    //     mongoServer = await MongoMemoryServer.create()
    //     await mongoose.connect(mongoServer.getUri())
    //     await configSeed()
    //     await counterSeed()
    //     await createCustomer(registerPayload)
    // })

    // afterAll(async () => {
    //     await mongoose.disconnect()
    //     await mongoose.connection.close()
    //     if (mongoServer) await mongoServer.stop()
    // })

    // test('should return valid token strings when customer existed', async () => {
    //     const tokens = await login(customerData)

    //     expect(tokens).toBeDefined()

    //     const tokenVerification = verify(tokens.token, config.ACCESS_TOKEN_SECRET, { complete: true })
    //     const refreshVerification = verify(tokens.refresh_token, config.REFRESH_TOKEN_SECRET, { complete: true })

    //     expect(tokenVerification.payload.data).toBeDefined()
    //     expect(refreshVerification.payload.data).toBeDefined()
    // })

    // test('should throw error when customer not existed', async () => {
    //     await CustomerModel.findOneAndDelete({ user: registerPayload.txtuser })

    //     try {
    //         await login(customerData)
    //     } catch (err) {
    //         expect(err.message).toEqual('Auth user not found.')
    //     }
    // })
})
