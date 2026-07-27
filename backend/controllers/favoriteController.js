import {sql} from '../config/db.js';

export const addFavorite = async (req,res) => {
    try{
        const {movieId} = req.body;
        const userId = req.user.id;

        const favorite = await sql
            `INSERT INTO favorites (user_id,movie_id) VALUES (${userId},${movieId}) RETURNING *;`;
            res.status(201).json({success:true,message:'Movie added to favorites',favorite:favorite[0]});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to add movie to favorites'});
    }
}

export const getFavorites = async (req,res) => {
    try{
        const userId = req.user.id;

        const favorites = await sql 
            `SELECT * FROM favorites WHERE user_id=${userId} ORDER BY created_at DESC;`;
            res.status(200).json({success:true,favorites});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to fetch favorites'});
    }
}

export const removeFavorite = async (req,res) => {
    try{
        const userId = req.user.id;
        const {movieId} = req.params;

        await sql `DELETE FROM favorites WHERE user_id=${userId} AND movie_id=${movieId};`;
        res.status(200).json({success:true,message:'Movie removed from favorites'});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to remove movie from favorites'});
    }
}

export const checkFavorite = async (req, res) => {
    try {
        const userId = req.user.id;
        const { movieId } = req.params;

        const favorite = await sql`
            SELECT * FROM favorites
            WHERE user_id = ${userId}
            AND movie_id = ${movieId};
        `;

        res.status(200).json({
            isFavorite: favorite.length > 0,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to check favorite",
        });
    }
};