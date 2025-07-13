import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import { startCurrentUpdater, startHistoryLogger } from "./cron/jobs.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", cryptoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    startCurrentUpdater();   // runs every 30 minutes
    startHistoryLogger();    // runs every 1 hour
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
