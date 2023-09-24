import { Router } from 'express'
import { forecasts } from '../controllers/forecasts'

const router = Router()

router.get('/:city_id', forecasts)

export default router