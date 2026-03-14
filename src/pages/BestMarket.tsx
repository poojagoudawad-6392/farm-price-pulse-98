import BestMarketCard from "@/components/BestMarketCard";
import PriceTable from "@/components/PriceTable";
import { mockData } from "@/lib/api";

const BestMarket = () => {
  const best = mockData.searchResults.reduce((a, b) => (a.price > b.price ? a : b));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Best Market Recommendation
      </h1>
      <p className="text-muted-foreground mb-6">
        See which market is currently offering the highest price for your crop.
      </p>

      <BestMarketCard market={best.market} crop={best.crop} price={best.price} />

      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
          All Markets
        </h2>
        <PriceTable data={mockData.searchResults} />
      </div>
    </div>
  );
};

export default BestMarket;
