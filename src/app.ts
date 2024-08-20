import express from "express";
import cors from 'cors'
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true }));
app.use(cors())

//routes import
import userRouter from './routes/user-router'

//routes declaration
app.use('/api/v1',userRouter);

export default app