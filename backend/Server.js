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
app.use(cors());
// https://ecommerce-website-3-tg4v.onrender.com/get-active-product
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);

router.post("/test", (req, res) => {
  res.json({ msg: "chlado ab" });
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
