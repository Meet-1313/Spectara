import express from 'express';
import { registerUser, loginUser,getCurrentUser,
    updateProfile, changePassword
} from '../controllers/authController.js';
import {verifyToken} from '../middleware/verifyToken.js';
const router = express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',verifyToken,getCurrentUser);
router.put("/profile", verifyToken, updateProfile);
router.put("/change-password", verifyToken, changePassword);

export default router;