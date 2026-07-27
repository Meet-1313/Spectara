import { sql } from '../config/db.js';
import cloudinary from '../config/cloudinary.js';
import streamifier from 'streamifier';

export const getProfile = async (req,res) => {
    try{
        const userId = req.user.id;

        const user = await sql `
            SELECT email, username, created_at, profile_image FROM users WHERE id = ${userId}`;

        const favorites = await sql `
            SELECT movie_id FROM favorites WHERE user_id = ${userId} ORDER BY created_at DESC`;
        
        // const favoriteCount = await sql `
        // SELECT COUNT(*) AS count FROM favorites WHERE user_id = ${userId}`;
        
        const watchlist = await sql `
            SELECT movie_id FROM watchlist WHERE user_id = ${userId} ORDER BY created_at DESC`;

        // const ratings = await sql `
        //     SELECT COUNT(*) AS count FROM ratings WHERE user_id = ${userId}`;
        
        // const reviews = await sql `
        //     SELECT COUNT(*) AS count FROM reviews WHERE user_id = ${userId}`;
        
        res.status(200).json({
            success:true,
            profile:{
                username:user[0].username,
                email:user[0].email,
                 created_at: user[0].created_at,
                  profile_image: user[0].profile_image,
                favorites,watchlist,
                // ratings:Number(ratings[0].count),
                // reviews:Number(reviews[0].count)
            }
        });
    }
    catch(err){
        console.error('Error fetching profile data:', err);
        res.status(500).json({success:false,message:'Internal server error'});
    }
}

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded.",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "spectara/profile-images",
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            message: "Cloudinary upload failed.",
          });
        }
        await sql`
  UPDATE users
  SET profile_image = ${result.secure_url}
  WHERE id = ${req.user.id}
`;
        return res.status(200).json({
  success: true,
  message: "Profile image uploaded successfully.",
  imageUrl: result.secure_url,
});
        
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};