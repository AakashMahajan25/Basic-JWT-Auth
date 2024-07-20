import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(cors());
dotenv.config();
app.use(bodyParser.json());

export default app;
