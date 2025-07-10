import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes.js";
import { startCronJob } from "./cron/hourlyJob.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", cryptoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    startCronJob();
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
