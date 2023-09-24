import { Router } from 'express'
import { create_temperatures } from '../controllers/temperatures'

const router = Router()

router.post('/', create_temperatures)

export default router