import { NextFunction, Request, Response } from "express";
import uploadOnCloudinary from "../utils/cloudinary-config";
import {client} from '../db/Connection'
import asyncErrorHandler from "../utils/asyncErrorHandler";
import CustomError from "../utils/CustomError";
import { IGetUserAuthInfoRequest } from '../middlewares/auth-middleware';
//Retrieving users 
export const getUsers = asyncErrorHandler(async (req:Request,res:Response, next:NextFunction) => {
  
    const result = await client.query('select * from users');
    res.status(200).json(result.rows);
    
})


//Saving user in database
export const saveUser = asyncErrorHandler( async (req:Request | any,res:Response, next:NextFunction) =>{

    const {firstName, lastName, email } = req.body;
    const {id} = req.user;

    if(!firstName || !lastName || !email){
        const err = new CustomError(`Send the valid data`,400);
        return next(err);
    }
    
    let profileUrl = '';
    
    if (!req.file || !req.file.path) {
        const err = new CustomError(`Image file not found`,400);
        return next(err);
    }
    
    const uploadResult = await uploadOnCloudinary(req.file.path);

    if (!uploadResult || !uploadResult.secure_url) {
        const err = new CustomError(`Failed to upload on cloudinary `,500);
        return next(err);
    } 
    
    profileUrl = uploadResult.secure_url;

    const result = await client.query(
        'UPDATE users SET profile_url = $1 WHERE id = $2 RETURNING *',
        [profileUrl, id]
    );

    if (!result.rows[0]) {
        const err = new CustomError(`Failed to update user profile`, 500);
        return next(err);
    }

    return res.status(200).json({ message: 'Profile updated successfully' });
    
}
)

//Saving each user links
export const saveUserLinks = asyncErrorHandler(async(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction) =>{

    const user  = req.user;
    const {id} = user;
    const {userLinks} = req.body
    if(!id || !userLinks){
        const err = new CustomError(`Send the id and userlinks`,400);
        return next(err);
    }

    userLinks.map(async(link: { platform: string; url: string; })=>{
        const platform = link.platform;
        const url = link.url;
        const user_id = id;
        await client.query('insert into user_links(platform,url,user_id) values($1,$2,$3)',[platform,url,user_id]);
    });

    res.status(201).json({message: 'Links created successfully'});
    
})


//get user
export const getUser = asyncErrorHandler(async (req:IGetUserAuthInfoRequest,res:Response,next:NextFunction) => {
   const id = req.user.id;
    
    const user = await client.query('SELECT * FROM USERS WHERE id=$1',[id]);

    if(!user){
        const err = new CustomError(`No user with this id`,404);
        return next(err);
    }

    const links = await client.query('SELECT * FROM user_links WHERE user_id=$1',[id]);

    if(!links){
        const err = new CustomError(`No links found `,404);
        return next(err);
    }
    user.rows[0].links = links.rows;
    if(user.rowCount) res.json({user: user.rows[0]});
 
});

export const deleteLink = asyncErrorHandler(async(req: Request, res: Response, next:NextFunction) =>{

    const {id} = req.params;
        
    const result = await client.query('DELETE FROM user_links WHERE id=$1 RETURNING *',[id]);

    res.status(201).json({message: 'Link deleted successfully'});
   
})

export const getLinks = asyncErrorHandler(async(req:IGetUserAuthInfoRequest,res:Response,next:NextFunction) =>{
    
    const id = req.user.id
    const result = await client.query('select * from user_links where user_id=$1',[id]);

    if(!result.rows){
        const err = new CustomError('Invalid user id',400);
        return next(err);
    }
    res.status(200).json({links:result.rows});  
})