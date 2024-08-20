import * as mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

export const Connection =(): void =>{
    mongoose
    .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.jarys.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(()=>console.log('Database connected successfully'))
    .catch((err:any)=>{
        console.log('Error while connecting to database',err);
        throw err;
    });
}

