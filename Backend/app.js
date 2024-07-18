import express from "express";
import { dbConnection } from "./database/dbConnection.js";

const app = express();

dbConnection();
export default app;
