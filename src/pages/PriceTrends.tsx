import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import TrendChart from "@/components/TrendChart";
import { api, mockData, type TrendPoint } from "@/lib/api";

const PriceTrends = () => {
  const [data, setData] = useState<TrendPoint[]>([]);
  const [crop, setCrop] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setCrop(query);
    setLoading(true);
    try {
      const trend = await api.getPriceTrend(query);
      setData(trend);
    } catch {
      setData(mockData.trendData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Price Trends
      </h1>
      <p className="text-muted-foreground mb-6">
        Track historical prices and identify the best time to sell.
      </p>

      <SearchBar onSearch={handleSearch} placeholder="Enter crop name (e.g. Tomato)" />

      {loading && (
        <div className="mt-8 p-8 text-center animate-pulse text-muted-foreground">
          Loading trend data...
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="mt-8">
          <TrendChart data={data} crop={crop} />
        </div>
      )}
    </div>
  );
};

export default PriceTrends;
