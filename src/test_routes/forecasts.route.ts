import { Router } from 'express'
import { forecasts } from '../test_controllers/forecasts.controller'

const router = Router()

router.get('/:city_id', forecasts)

export default router