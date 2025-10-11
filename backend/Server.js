import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import router from "./routes/app-routes.js";
import cors from "cors";
import Database from "./config/db.js";
import { fileURLToPath } from "url";
import path from "path";
const PORT = process.env.PORT || 3000;
// import serverless from "serverless-http";
const app = express();

Database();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);
app.use(
  cors({
    origin: ["https://ecommerce-website-teal-theta.vercel.app"],

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
// export default serverless(app);
