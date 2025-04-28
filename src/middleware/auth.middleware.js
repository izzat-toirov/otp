import jwt from "jsonwebtoken";
import { catchError } from "../utils/error.response.js";


export const JwtAuthGuard = (req, res, next) => {
    try {
        const auth = req.headers?.authorization;
        // console.log(auth);      
        
        if(!autn || !auth.startsWith('Bearer')){
            catchError(res, 401, 'Autohorization');
        }
        const token = auth.split(' ')[1];
        if(!token){
            catchError(req, 401, 'Token not found');
        }
        const decodeData = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if(!decodeData){
            catchError(res, 401, 'Token expired');
        }
        req.user = decodeData;
        next();
    } catch (error) {
        catchError(res, 500, error.message);
    }
}