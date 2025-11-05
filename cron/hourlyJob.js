import cron from "node-cron";
import { fetchCryptoData } from "../services/fetchCryptoData.js";
import CurrentCrypto from "../models/CurrentCrypto.js";
import HistoricalCrypto from "../models/HistoricalCrypto.js";

// 🕒 Cron Job 1: Every 30 mins => Update dashboard (CurrentCrypto)
export const startCurrentUpdater = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      // const data = await fetchCryptoData();
      // await CurrentCrypto.deleteMany({});
      // await CurrentCrypto.insertMany(data);
      // console.log("[CRON-30min] Updated CurrentCrypto:", new Date());
    } catch (err) {
      console.error("[CRON-30min ERROR]", err.message);
    }
  });
};

// 🕐 Cron Job 2: Every 1 hour => Save snapshot to HistoricalCrypto
export const startHistoryLogger = () => {
  cron.schedule("0 * * * *", async () => {
    try {
      const current = await CurrentCrypto.find();
      if (current.length > 0) {
        await HistoricalCrypto.create({ coins: current });
        console.log("[CRON-1hr] Saved snapshot to HistoricalCrypto:", new Date());
      }
    } catch (err) {
      console.error("[CRON-1hr ERROR]", err.message);
    }
  });
};