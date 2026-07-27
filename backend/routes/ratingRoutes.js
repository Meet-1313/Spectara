import express from 'express';
import {addRating,getRating, deleteRating} from '../controllers/ratingController.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addRating);
router.get('/:movieId', verifyToken, getRating);
router.delete('/:movieId', verifyToken, deleteRating);

export default router;