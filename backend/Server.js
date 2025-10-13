import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import router from "./routes/app-routes.js";
import cors from "cors";
import Database from "./config/db.js";
import { fileURLToPath } from "url";
import path from "path";
const PORT = process.env.PORT;
const app = express();
Database();
app.use(
  cors({
    origin: [
      "http://localhost:5173", // for local testing
      "https://ecommerce-website-two-zeta.vercel.app", // your live frontend
    ],
    credentials: true,
  })
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// isko mehfooz kro
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
