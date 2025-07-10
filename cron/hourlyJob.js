import cron from "node-cron";
import { fetchCryptoData } from "../services/fetchCryptoData.js";
import CurrentCrypto from "../models/CurrentCrypto.js";
import HistoricalCrypto from "../models/HistoricalCrypto.js";

// Runs every hour at minute 0
export const startCronJob = () => {
  cron.schedule("0 * * * *", async () => {  
    try {
      const data = await fetchCryptoData();
      await CurrentCrypto.deleteMany({});
      await CurrentCrypto.insertMany(data);
      await HistoricalCrypto.create({ coins: data });
      console.log("[CRON] Crypto data synced at:", new Date());
    } catch (error) {
      console.error("[CRON ERROR]", error.message);
    }
  });
};
