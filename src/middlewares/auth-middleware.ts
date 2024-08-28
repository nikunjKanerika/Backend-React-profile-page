import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import CustomError from "../utils/CustomError";

dotenv.config();
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profile_url?: string;
}
export interface IGetUserAuthInfoRequest extends Request {
    user?:User
}

export const authenticateJWT = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader){
        const err = new CustomError('No authentication header',400);
        return next(err);
    }
   
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
        if (err) {
            return next(err);
        }
        req.user = user as User;
        next();  
    });
        
    
};
