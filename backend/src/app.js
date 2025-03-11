import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);

connectDB();

export default app;
