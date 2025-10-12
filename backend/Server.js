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
    origin: ["https://ecommerce-website-blond-beta.vercel.app"],
  })
);
app.use((req, res, next) => {
  // ✅ Allow your frontend origin
  res.header(
    "Access-Control-Allow-Origin",
    "https://ecommerce-website-blond-beta.vercel.app"
  );

  // ✅ Allow credentials if you use cookies/JWT
  res.header("Access-Control-Allow-Credentials", "true");

  // ✅ Allow required headers
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // ✅ Allow HTTP methods
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // ✅ Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/test", (req, res) => {
  res.json({ msg: "chlado ab" });
});
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
