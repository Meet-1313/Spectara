import {sql}  from '../config/db.js';

export const getCurrentUser = async (req,res) => {
    try{
        const userId = req.user.id;

        const users = await sql `SELECT id,username,email,created_at
        FROM users WHERE id = ${userId};`

        if(users.length === 0){
            return res.status(404).json({success:false,message:'User not found'});
        }
        res.status(200).json({success:true,message:'User found',user:users[0]});
    }catch(error){
        console.error('Error fetching user:',error);
        res.status(500).json({success:false,message:'Server error'});
    }
}