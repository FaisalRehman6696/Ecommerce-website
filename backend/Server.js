import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import router from "./routes/app-routes.js";
import cors from "cors";
import Database from "./config/db.js";
import { fileURLToPath } from "url";
import path from "path";
const PORT = process.env.PORT 
// import serverless from "serverless-http";
const app = express();

Database();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use(
  cors({
    origin: ["https://ecommerce-website-teal-theta.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors()); // Handle preflight requests globally
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
// export default serverless(app);
