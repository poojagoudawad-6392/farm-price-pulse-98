import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { TrendPoint } from "@/lib/api";

interface TrendChartProps {
  data: TrendPoint[];
  crop: string;
}

const TrendChart = ({ data, crop }: TrendChartProps) => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
        {crop} — 7 Day Price Trend
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
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
            <Line
              type="monotone"
              dataKey="price"
              stroke="#047857"
              strokeWidth={2.5}
              dot={{ fill: "#047857", r: 4 }}
              activeDot={{ r: 6, fill: "#047857" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
