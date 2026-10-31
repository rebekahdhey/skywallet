import { Router } from 'express'
import { createPass, getPasses } from '../controllers/passController'

const router = Router()

router.get('/', getPasses)
router.post('/', createPass)

export default router