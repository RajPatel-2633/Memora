import app from "./app";
import {env} from "./config/env"
import { connectDB } from "./utils/db.utils";

const PORT = process.env.PORT ?? 8080;

const startServer = async()=>{
    await connectDB();

    app.listen(PORT,()=>{
    console.log(`Server is Running on PORT ${PORT}`);
});

}

startServer();


