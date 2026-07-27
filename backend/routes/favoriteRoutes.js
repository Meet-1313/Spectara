import express from 'express';
import {addFavorite, getFavorites, removeFavorite,checkFavorite} from '../controllers/favoriteController.js';
import {verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/',verifyToken,addFavorite);
router.get('/',verifyToken,getFavorites);
router.delete('/:movieId',verifyToken,removeFavorite);
router.get("/check/:movieId", verifyToken, checkFavorite);

export default router;