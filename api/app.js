import express,{json} from 'express';
import cors from 'cors';
import morgan from 'morgan';
import adminRouter from "./Routes/adminRouter.js";
import userRouter from "./Routes/userRouter.js"
import db from './Routes/dbconnect.js';
import cookieParser from 'cookie-parser'; 


// import userRouter from "../api/Routes/userRouter.js";
import dotenv from 'dotenv';

dotenv.config();

const app=express();
const {listen_port} =process.env;

app.use(cors({origin:"*",
credentials: true}))
app.use(json());
app.use(morgan());
app.use("/", adminRouter);
app.use(cookieParser())
app.use("/user",userRouter);

app.listen((listen_port),()=>{
    console.log(`App listening to port ${listen_port}`);
})

