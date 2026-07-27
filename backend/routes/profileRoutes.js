import express from 'express';
import {getProfile} from '../controllers/profileController.js';
import {verifyToken} from '../middleware/verifyToken.js';
import upload from "../middleware/upload.js";
import { uploadProfileImage } from "../controllers/profileController.js";
const router = express.Router();

router.get('/',verifyToken, getProfile);
router.post(
  "/upload-profile-image",
  verifyToken,
  upload.single("image"),
  uploadProfileImage
);

export default router;