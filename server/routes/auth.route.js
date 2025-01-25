import express from 'express';
import { checkAuth, login, logout, signup, updateFullNameAndEmail, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login',login)
router.post('/signup',signup)
router.post('/logout', logout)
router.put('/update-profile',protectRoute, updateProfile)
router.put('/update-credentials',protectRoute, updateFullNameAndEmail)
router.get('/check',protectRoute, checkAuth)
export default router