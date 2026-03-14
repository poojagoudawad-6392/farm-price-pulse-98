import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import PriceTable from "@/components/PriceTable";
import ComparisonChart from "@/components/ComparisonChart";
import { api, mockData, type PriceEntry } from "@/lib/api";

const SearchCrop = () => {
  const [results, setResults] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (crop: string) => {
    setLoading(true);
    setSearched(true);
    try {
      const data = await api.searchCrop(crop);
      setResults(data);
    } catch {
      // Fallback to mock data for demo
      setResults(
        mockData.searchResults.filter((r) =>
          r.crop.toLowerCase().includes(crop.toLowerCase())
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Search Crop Prices
      </h1>
      <p className="text-muted-foreground mb-6">
        Find the best prices across all markets for any crop.
      </p>

      <SearchBar onSearch={handleSearch} />

      {searched && (
        <div className="mt-8 space-y-8">
          <PriceTable data={results} loading={loading} />
          {results.length > 0 && <ComparisonChart data={results} />}
        </div>
      )}
    </div>
  );
};

export default SearchCrop;
