import express from 'express';
import {verifyToken} from '../middleware/verifyToken.js';
import {addReview,getReview,getMovieReviews,deleteReview} from '../controllers/reviewController.js';

const router = express.Router();
router.get('/:movieId',verifyToken,getReview);
router.post('/',verifyToken,addReview);
router.get('/movie/:movieId',verifyToken,getMovieReviews);
router.delete('/:movieId',verifyToken,deleteReview);

export default router;