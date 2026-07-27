import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    try{
        //get authorization header from the request
        const authHeader = req.headers.authorization;
        //check if header exists
        if(!authHeader){
            return res.status(401).json({successs:false,message: 'Authorization header missing'});
        }

        //get token from the header
        const token = authHeader.split(" ")[1];
        //verfiy token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //save decoded user data
        req.user = decoded;
        //call next middleware
        next(); 
    }
    catch(err){
        console.error('Error verifying token:',err);
        res.status(401).json({success:false,message:'Invalid token'});
    }
}