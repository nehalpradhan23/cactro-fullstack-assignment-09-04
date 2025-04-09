import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoute.js";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

await connectDB();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.send("API working"));

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => console.log("Server running on port", +PORT));
