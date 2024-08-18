import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export function Connection (){
    mongoose
    .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.jarys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then((res)=>console.log('Database connected successfully'))
    .catch((err)=>console.log('Error while connecting to database',err));
}

