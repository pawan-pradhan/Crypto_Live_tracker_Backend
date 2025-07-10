import axios from "axios";

export const fetchCryptoData = async () => {
    try {
        const response = await axios.get(
            "https://api.coingecko.com/api/v3/coins/markets",
            {
                params: {
                    vs_currency: "usd",
                    order: "market_cap_desc",
                    per_page: 10,
                    page: 1,
                    sparkline: false,
                },
            }
        );
    
        return response.data;
    } catch (error) {

        console.error("[COINGECKO ERROR]", error.response?.status, error.message);
        throw new Error("CoinGecko rate limit exceeded. Try again later.");
    }
};