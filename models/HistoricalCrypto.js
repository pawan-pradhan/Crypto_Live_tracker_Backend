import mongoose from 'mongoose';

const historicalCryptoSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  coins: [Object],
});

export default mongoose.model('HistoricalCrypto', historicalCryptoSchema);
