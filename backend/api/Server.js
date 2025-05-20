import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import router from "../routes/app-routes.js";
import cors from "cors";
import Database from "../config/db.js";
import { fileURLToPath } from "url";
import path from "path";
import serverless from "serverless-http";

const app = express();
app.use(express.json());
// const PORT = process.env.PORT;
Database();


app.use(cors({
  origin: "https://frontend-ecommerce-drab.vercel.app", // or your specific frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api",router);

// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });
export const handler = serverless(app); // 👈 use named export
export default handler;