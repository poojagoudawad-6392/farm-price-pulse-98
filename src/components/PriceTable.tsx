import type { PriceEntry } from "@/lib/api";

interface PriceTableProps {
  data: PriceEntry[];
  loading?: boolean;
}

const PriceTable = ({ data, loading }: PriceTableProps) => {
  if (loading) {
    return (
      <div className="p-8 text-center animate-pulse text-muted-foreground">
        Fetching market data...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No results found. Try searching for a crop.
      </div>
    );
  }

  const maxPrice = Math.max(...data.map((item) => item.price));

  return (
    <div className="overflow-hidden rounded-xl bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary border-b border-border">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Market
              </th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                Price/kg
              </th>
              <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row, idx) => (
              <tr
                key={idx}
                className={
                  row.price === maxPrice ? "bg-primary/5" : ""
                }
              >
                <td className="p-4 font-medium text-foreground">
                  {row.market}
                  <div className="text-xs text-muted-foreground font-normal">
                    {row.date}
                  </div>
                </td>
                <td className="p-4 text-right font-mono font-bold text-foreground tabular-nums">
                  ₹{row.price.toLocaleString("en-IN")}
                </td>
                <td className="p-4 text-right">
                  {row.price === maxPrice ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-tight">
                      Best Market
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      -{((maxPrice - row.price) / maxPrice * 100).toFixed(0)}%
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTable;
