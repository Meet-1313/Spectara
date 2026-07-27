import {sql} from '../config/db.js';

export const addToWatchlist = async (req, res) => {
    const userId = req.user.id;
    const { movieId } = req.body;

    try{
        const watchlistItem = await sql`
            INSERT INTO watchlist (user_id, movie_id)
            VALUES (${userId}, ${movieId})
            RETURNING *;
        `;
        res.status(201).json({success:true,message:'Movie added to watchlist',watchlistItem:watchlistItem[0]});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to add movie to watchlist'});
    }
} 

export const removeWatchlist = async (req,res) => {
    try{
        const userId = req.user.id;
        const {movieId} = req.params;
        await sql`
            DELETE FROM watchlist
            WHERE user_id = ${userId}
            AND movie_id = ${movieId};
        `;
        res.status(200).json({success:true,message:'Movie removed from watchlist'});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to remove movie from watchlist'});
    }
}

export const getWatchlist = async (req,res) => {
    try{
        const userId = req.user.id;
        const watchlist = await sql`
            SELECT * FROM watchlist
            WHERE user_id = ${userId}
            ORDER BY created_at DESC;
        `;
        res.status(200).json({success:true,watchlist});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to fetch watchlist'});
    }
}

export const checkWatchlist = async (req, res) => {
    try{
        const userId = req.user.id;
        const { movieId } = req.params;
        const watchlistItem = await sql`
            SELECT * FROM watchlist
            WHERE user_id = ${userId}
            AND movie_id = ${movieId};`;
            res.status(200).json({
                isInWatchlist : watchlistItem.length > 0
            });
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to check watchlist'});
    }
}

