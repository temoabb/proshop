import express from 'express';
const router = express.Router();

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile
} from "../controllers/userController.js";

import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser); // /api/users
router.post('/login', authUser); // /api/users/login

router.get('/profile', protect, getUserProfile); // /api/users/profile
router.put('/profile', protect, updateUserProfile); // /api/users/profile

export default router;