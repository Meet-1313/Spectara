import {sql } from "../config/db.js";

export const addReview = async (req,res) => {
    const userId = req.user.id;
    const {movieId,review} = req.body;
    try{
        const existingReview = await sql`
        SELECT * FROM reviews WHERE user_id = ${userId} AND movie_id = ${movieId};`;
        if(existingReview.length > 0){
            const updatedReview = await sql`
            UPDATE reviews SET review = ${review} WHERE user_id = ${userId} AND movie_id = ${movieId} RETURNING *;`;
            res.status(200).json({success:true,message:'Review updated',review:updatedReview[0]});
        }else{
            const newReview = await sql`
            INSERT INTO reviews (user_id, movie_id, review)
            VALUES (${userId}, ${movieId}, ${review})
            RETURNING *;`;
            res.status(201).json({success:true,message:'Review added',review:newReview[0]});
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to add/update review'});
    }
}

export const getReview = async (req,res) => {
     try{
    const userId = req.user.id;
    const {movieId} = req.params;
        const review = await sql`
        SELECT * FROM reviews WHERE user_id = ${userId} AND movie_id = ${movieId};`;
        if(review.length > 0){
            res.status(200).json({success:true,review:review[0]});
        }
        else{
            res.status(200).json({success:true,review:null});
        }
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to fetch review'});
    }
}

export const getMovieReviews = async (req,res) => {
    try{
        const {movieId} = req.params;
        const reviews = await sql`
        SELECT
        reviews.*,
        users.username
    FROM reviews
    JOIN users
        ON reviews.user_id = users.id
    WHERE reviews.movie_id = ${movieId}
    ORDER BY reviews.created_at DESC;
`;
        res.status(200).json({success:true,reviews});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to fetch reviews'});
    }
}

export const deleteReview = async (req,res) => {
    try{
        const userId = req.user.id;
        const {movieId} = req.params;
        await sql`
        DELETE FROM reviews WHERE user_id = ${userId} AND movie_id = ${movieId};`;
        res.status(200).json({success:true,message:'Review deleted'});
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message:'Failed to delete review'});
    }
}   

