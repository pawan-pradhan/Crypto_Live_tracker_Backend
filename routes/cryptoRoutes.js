import express from "express";
import CurrentCrypto from "../models/CurrentCrypto.js";
import HistoricalCrypto from "../models/HistoricalCrypto.js";
import { fetchCryptoData } from "../services/fetchCryptoData.js";

const router = express.Router();

router.get("/coins", async (req, res) => {
  try {
    const data = await CurrentCrypto.find().sort({ market_cap: -1 }); // ✅ Fetch from DB
    res.status(200).json({ current: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/history", async (req, res) => {
  try {
    console.log("Fetching historical data...");
    const history = await HistoricalCrypto.find().sort({ timestamp: -1 }).limit(24);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/history/:coinId", async (req, res) => {
  try {
      const { coinId } = req.params;
      console.log("id based Fetching historical data for coin:", coinId);
    const history = await HistoricalCrypto.find({
      "coins.id": coinId,
    }).sort({ timestamp: 1 });

    const filtered = history.map(entry =>
      entry.coins.find(c => c.id === coinId)
    );

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// empty api endpoint to continue alive the server
router.get("/alive", async (req, res) => {
  try {
    console.log("calling alive api end ...");
    
    res.json({message:"Alive api called"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
