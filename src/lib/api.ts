const API_BASE = "http://localhost:8000";

export interface PriceEntry {
  market: string;
  crop: string;
  price: number;
  date: string;
}

export interface TrendPoint {
  date: string;
  price: number;
}

export const api = {
  async addPrice(data: { market_name: string; crop_name: string; price_per_kg: string; date: string }) {
    const res = await fetch(`${API_BASE}/add_price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to add price");
    return res.json();
  },

  async searchCrop(crop: string): Promise<PriceEntry[]> {
    const res = await fetch(`${API_BASE}/search_crop?crop=${encodeURIComponent(crop)}`);
    if (!res.ok) throw new Error("Failed to search");
    return res.json();
  },

  async getPriceTrend(crop: string): Promise<TrendPoint[]> {
    const res = await fetch(`${API_BASE}/price_trend?crop=${encodeURIComponent(crop)}`);
    if (!res.ok) throw new Error("Failed to fetch trends");
    return res.json();
  },
};

// Mock data for demo when backend is unavailable
export const mockData = {
  searchResults: [
    { market: "Bangalore", crop: "Tomato", price: 28, date: "2026-03-12" },
    { market: "Mysore", crop: "Tomato", price: 32, date: "2026-03-12" },
    { market: "Mandya", crop: "Tomato", price: 30, date: "2026-03-12" },
    { market: "Hubli", crop: "Tomato", price: 26, date: "2026-03-12" },
    { market: "Dharwad", crop: "Tomato", price: 29, date: "2026-03-12" },
  ] as PriceEntry[],

  trendData: [
    { date: "Mar 6", price: 25 },
    { date: "Mar 7", price: 27 },
    { date: "Mar 8", price: 28 },
    { date: "Mar 9", price: 26 },
    { date: "Mar 10", price: 30 },
    { date: "Mar 11", price: 31 },
    { date: "Mar 12", price: 32 },
  ] as TrendPoint[],

  alerts: [
    { id: 1, message: "Tomato price is higher in Mysore market (₹32/kg) compared to Bangalore (₹28/kg).", type: "opportunity" as const, time: "2 hours ago" },
    { id: 2, message: "Onion price increased by 15% in Hubli market today.", type: "increase" as const, time: "5 hours ago" },
    { id: 3, message: "Rice prices dropped below ₹40/kg in Mandya — consider holding stock.", type: "warning" as const, time: "1 day ago" },
  ],

  nearbyMarkets: [
    { name: "Mandya", crop: "Tomato", price: 30, distance: 10 },
    { name: "Mysore", crop: "Tomato", price: 32, distance: 25 },
    { name: "Bangalore", crop: "Tomato", price: 28, distance: 45 },
    { name: "Hubli", crop: "Tomato", price: 26, distance: 80 },
  ],
};
