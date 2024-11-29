
import jwt from 'jsonwebtoken';
import { EnvVars } from '../config/EnvVars.js';
import User from '../model/UserModel.js';

export const ProtectRouter = async (req, res, next) =>{
    try {
        const token = req.cookies["job"]
        if(!token){
            return res.status(401).json({success : false , message : "Please Login First"})
        }
        const decoded = jwt.verify(token , EnvVars.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({success : false , message : "Invalid Token"})
        }

        const user = await User.findById(decoded.userId)
        if(!user){
            return res.status(404).json({success : false , message : "User Not Found"})
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error in ProtectRouter Middleware", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}