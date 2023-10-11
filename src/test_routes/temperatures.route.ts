import { Router } from 'express'
import { create_temperatures } from '../test_controllers/temperatures.controller'

const router = Router()

router.post('/', create_temperatures)

export default router