import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import app from '../../app'
import CustomerModel from '../../models/customer-model'
import supertest from 'supertest'
import { createCustomer } from '../../services/customer'
import counterSeed from '../../seeds/counter-seed'
import configSeed from '../../seeds/config-seed'

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

describe('users/login', () => {
    // let loginPayload
    // beforeEach(() => {
    //     loginPayload = {
    //         username: 'testuser@gmail.com',
    //         password: '123452'
    //     }
    // })

    // beforeAll(async () => {
    //     mongoServer = await MongoMemoryServer.create()
    //     await mongoose.connect(mongoServer.getUri())
    //     await configSeed()
    //     await counterSeed()
    //     await createCustomer(registerPayload)
    // })

    // afterAll(async () => {
    //     await CustomerModel.findOneAndDelete({ user: registerPayload.txtuser })
    //     await mongoose.disconnect()
    //     await mongoose.connection.close()
    //     if (mongoServer) await mongoServer.stop()
    // })

    // test('give executable data and should return status 200 with tokens', async () => {
    //     const {statusCode, body} = await supertest(app).post("/users/login").send(loginPayload)

    //     expect(statusCode).toBe(200)
    //     expect(body.data.token).toBeDefined()
    // })

    // test('give unexisted username and should return status 401', async () => {
    //     loginPayload.username = 'usertest'

    //     const {statusCode, body} = await supertest(app).post("/users/login").send(loginPayload)

    //     expect(statusCode).toBe(401)
    // })

    // test('give wrong password and should return status 401', async () => {
    //     loginPayload.username = 'wrongpassword'

    //     const {statusCode, body} = await supertest(app).post("/users/login").send(loginPayload)

    //     expect(statusCode).toBe(401)
    // })
})
