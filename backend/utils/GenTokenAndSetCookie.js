import jwt from 'jsonwebtoken';
import { EnvVars } from '../config/EnvVars.js';

export const GenTokenAndSetCookie = (userId , res)=>{
    const token = jwt.sign({userId} , EnvVars.JWT_SECRET, {expiresIn : "15d"})
    res.cookie("job" , token , {
        httpOnly : true,
        maxAge : 15 * 24 * 60 * 60 * 1000,
        sameSite : "strict",
    })
    return token
}

export default GenTokenAndSetCookie