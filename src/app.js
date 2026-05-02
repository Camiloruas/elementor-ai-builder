import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateRouter } from "./routes/generate.route.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "..", "public");

app.use(express.json());
app.use(express.static(publicDir));
app.use(generateRouter);

export { app };

