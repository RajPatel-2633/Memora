import express from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import ApiResponse from "./utils/ApiResponse.utils";
import { timeStamp } from "node:console";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(errorMiddleware)

app.get("/health",(req,res)=>{ 
    res.status(201).json(new ApiResponse(200,{
        service: "Memora API",
        version: "1.0.0",
        environment: process.env.NODE_ENV,
        timeStamp: new Date().toISOString()
    },
    "API is Healthy"
 ));
});

export default app;
