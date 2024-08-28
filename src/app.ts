import express from "express";
import cors from 'cors'
import globalErrorHandler from './controllers/error-controller'
const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended: true }));
app.use(cors())

//routes import
import userRouter from './routes/user-router'

app.all('*',)
//routes declaration
app.use('/api/v1',userRouter);

//global error handling middleware
app.use(globalErrorHandler);
export default app