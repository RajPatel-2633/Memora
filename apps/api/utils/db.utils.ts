import prisma from "../config/prisma"


export const connectDB = async(): Promise<void> =>{
    try{
        await prisma.$connect();
        console.log("Connected to Database");
    } catch (error){
        console.error("Database Connection Failed");
        console.error(error);
        process.exit(1);
    }
}