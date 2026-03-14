import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { PriceEntry } from "@/lib/api";

interface ComparisonChartProps {
  data: PriceEntry[];
}

const ComparisonChart = ({ data }: ComparisonChartProps) => {
  const maxPrice = Math.max(...data.map((d) => d.price));

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
        Market Price Comparison
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis dataKey="market" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} tickFormatter={(v) => `₹${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`₹${value}/kg`, "Price"]}
            />
            <Bar dataKey="price" radius={[6, 6, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.price === maxPrice ? "#047857" : "#94a3b8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonChart;
