import express from 'express'
import { user } from '../controllers/userController.js'
import protectRoute from "../middleware/ProtectRoute.js"

const router = express.Router()

router.get('/user', protectRoute, user)

export default router