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
app.use(
  cors({
    origin: [
      "https://ecommerce-website-omega-eight.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ecommerce-website-omega-eight.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(router);
// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.url);
//   next();
// });
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
// export default serverless(app);
