import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { configDotenv } from "dotenv";
import messageRouter from "./router/messageRouter.js";
import cors from "cors";

const app = express();

configDotenv({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
})
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v/message",messageRouter);
dbConnection();

export default app;
