import { sql } from "../config/db.js";

export const addRating = async (req, res) => {
    const userId = req.user.id;
    const {movieId,rating} = req.body;
    
    try{
        const existingRating = await sql` SELECT * FROM ratings WHERE user_id = ${userId}
        AND movie_id = ${movieId};`;
        if(existingRating.length > 0){
            const updatedRating = await sql`UPDATE ratings SET rating = ${rating}
            WHERE user_id = ${userId} AND movie_id = ${movieId} RETURNING *;`;
            res.status(200).json({success:true,message:'Rating updated',rating:updatedRating[0]});
        }
        else{
            const newRating = await sql `
            INSERT INTO ratings (user_id, movie_id, rating)
            VALUES (${userId}, ${movieId}, ${req.body.rating})
            RETURNING *;`;
            res.status(201).json({success:true,message:'Rating added',rating:newRating[0]});
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to add/update rating'});
    }
}
export const getRating = async (req,res) => {
    const userId = req.user.id;
    const {movieId} = req.params;
    try{
        const rating = await sql `
        SELECT * FROM ratings WHERE user_id = ${userId} AND movie_id = ${movieId};`;
        if(rating.length > 0) {
            res.status(200).json({success:true,rating:rating[0]});
        }else{
            res.status(200).json({success:true,rating:null});
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to fetch rating'}); 
    }
}

export const deleteRating = async (req,res) => {
    try{
        const userId = req.user.id;
        const {movieId} = req.params;
        await sql`
        DELETE FROM ratings WHERE user_id = ${userId} AND movie_id = ${movieId};`;
        res.status(200).json({success:true,message:'Rating deleted'});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to delete rating'}); 
    }
}