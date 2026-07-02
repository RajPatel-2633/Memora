import dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    NODE_ENV: process.env.NODE_ENV,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET!,
    FASTAPI_URL: process.env.FASTAPI_URL!,
};

