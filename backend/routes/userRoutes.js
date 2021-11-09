import express from 'express';
const router = express.Router();

import { authUser, getUserProfile, registerUser } from "../controllers/userController.js";
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);

export default router;