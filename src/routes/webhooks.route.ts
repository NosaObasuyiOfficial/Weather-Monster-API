import { Router } from 'express'
import { create_webhook, delete_webhook } from '../controllers/webhooks'

const router = Router()

router.post('/', create_webhook)
router.delete('/:id', delete_webhook)


export default router