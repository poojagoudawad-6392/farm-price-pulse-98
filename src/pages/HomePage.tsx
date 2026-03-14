import { TrendingUp, MapPin, Bell, Mic, Award } from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/StatCard";
import BestMarketCard from "@/components/BestMarketCard";
import { mockData } from "@/lib/api";

const HomePage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-24">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Local Farmer's Market Price Aggregator
        </h1>
        <p className="text-muted-foreground mt-1 max-w-xl">
          Compare real-time crop prices across markets. Sell smarter — bypass middlemen and get the best price for your harvest.
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Markets" value="12" icon={<MapPin size={20} />} />
        <StatCard label="Top Crop" value="Tomato" sub="₹32/kg" icon={<TrendingUp size={20} />} />
        <StatCard label="Active Alerts" value="3" icon={<Bell size={20} />} />
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="flex flex-col items-center justify-center p-4 bg-card rounded-2xl shadow-card border-2 border-dashed border-border hover:border-primary transition-colors"
        >
          <Mic className="text-primary mb-2" size={20} />
          <span className="text-xs font-bold uppercase text-muted-foreground">Voice Search</span>
        </motion.button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Recommended Sale */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Recommended Sale
            </h2>
            <BestMarketCard market="Mysore" crop="Tomato" price={32} />
          </section>

          {/* Prediction */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Price Prediction (Tomorrow)
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-foreground rounded-2xl text-background overflow-hidden relative"
            >
              <div className="relative z-10">
                <div className="text-muted-foreground text-xs font-medium mb-1">
                  Estimated Tomato Price
                </div>
                <div className="text-3xl font-bold tabular-nums">
                  ₹33.50{" "}
                  <span className="text-primary text-sm">↑ 4%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Based on 7-day trend analysis. ML predictions coming soon.
                </p>
              </div>
              <div className="absolute right-[-10%] bottom-[-20%] opacity-10">
                <TrendingUp size={120} />
              </div>
            </motion.div>
          </section>
        </div>

        {/* Nearby Markets */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
            Nearby Markets
          </h2>
          <div className="space-y-3">
            {mockData.nearbyMarkets.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center justify-between p-4 bg-card rounded-xl shadow-card"
              >
                <div>
                  <div className="font-medium text-foreground">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.distance} km away</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono tabular-nums text-foreground">₹{m.price}/kg</div>
                  {m.price === 32 && (
                    <span className="text-xs font-bold text-primary">Best</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
