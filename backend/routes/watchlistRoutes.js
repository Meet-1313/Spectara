import express from 'express';
import {addToWatchlist, getWatchlist, removeWatchlist, checkWatchlist} from '../controllers/watchlistController.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, addToWatchlist);
router.get('/', verifyToken, getWatchlist);
router.delete('/:movieId', verifyToken, removeWatchlist);
router.get("/check/:movieId", verifyToken, checkWatchlist);

export default router;