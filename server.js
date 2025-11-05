import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cryptoRoutes from "./routes/cryptoRoutes.js";

import fileRoutes from "./routes/fileRoutes.js";
import { startCurrentUpdater, startHistoryLogger } from "./cron/hourlyJob.js";

dotenv.config();

const app = express();

// ✅ Allow CORS for React (Vite default port 5173)
app.use(cors());

app.use(express.json());

// ✅ Routes
app.use("/api", cryptoRoutes);

app.use("/", fileRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    startCurrentUpdater();   // runs every 30 minutes
    startHistoryLogger();    // runs every 1 hour
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));





// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cryptoRoutes from "./routes/cryptoRoutes.js";
// import FilesSection from "./routes/fileRoutes.js";
// import { startCurrentUpdater, startHistoryLogger } from "./cron/hourlyJob.js";

// dotenv.config();

// const app = express();
// app.use(cors({

// }));
// app.use(express.json());

// app.use("/api", cryptoRoutes);

// app.use("/api/files", FilesSection);


// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//     startCurrentUpdater();   // runs every 30 minutes
//     startHistoryLogger();    // runs every 1 hour
//     app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
//   })
//   .catch((err) => console.error("❌ MongoDB error:", err));
