import { Router } from 'express'
import { create_a_city, update_a_city, delete_a_city } from '../controllers/cities'

const router = Router()

router.post('/', create_a_city)
router.patch('/:id', update_a_city)
router.delete('/:id', delete_a_city)

export default router