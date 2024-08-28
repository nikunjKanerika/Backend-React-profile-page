import { NextFunction, Request, Response } from "express";
import {client} from '../db/Connection'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import asyncErrorHandler from "../utils/asyncErrorHandler";
import logger from "../utils/logger";
import CustomError from "../utils/CustomError";

dotenv.config();


//Signup the user
export const signUp = asyncErrorHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await client.query(
        'INSERT INTO users("firstName", "lastName", email, password) VALUES($1, $2, $3, $4)',
        [firstName, lastName, email, hashedPassword]
    );

    logger.info('User Signed up successfully');
    res.status(201).json({ msg: 'Signed up successfully' });
    
})

//Login the user
export const login = asyncErrorHandler(async (req: Request, res: Response, next:NextFunction) => {
    const { email, password } = req.body;

    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
        logger.error('User not found');
        return res.status(400).json({ errorMsg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        const err = new CustomError('Invalid credentials',404);
        return next(err);
    }

    // Generate JWT
    const token = jwt.sign(user, process.env.JWT_SECRET);

    logger.info('Login successful');
    res.status(200).json({ msg: 'Login successful', token });
    
})