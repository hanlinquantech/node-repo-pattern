import { Router } from 'express'
import { login } from '../controllers/auth-controller'
import validator from '../middlewares/validator'
import {
	AuthLoginScheam
} from '../validators/auth-schema'
import { checkAuthenticated } from '../config/passport'

const router: Router = Router()

router.post('/login', validator(AuthLoginScheam), checkAuthenticated, login)

export default router
