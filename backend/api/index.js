import app from "./Server.js";
import serverless from "serverless-http";

export const handler = serverless(app);