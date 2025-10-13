import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import router from "./routes/app-routes.js";
import cors from "cors";
import Database from "./config/db.js";
import { fileURLToPath } from "url";
import path from "path";
import ServerlessHttp from "serverless-http";

const PORT = process.env.PORT;
const app = express();

Database();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
// isko b
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", router);

export const handler = ServerlessHttp(app);
