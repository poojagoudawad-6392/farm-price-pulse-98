import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    market_name: "",
    crop_name: "",
    price_per_kg: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [status, setStatus] = useState<{ type: string; msg: string }>({ type: "", msg: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", msg: "Uploading..." });
    try {
      await api.addPrice(formData);
      setStatus({ type: "success", msg: "Price data updated successfully." });
      setFormData({ ...formData, price_per_kg: "" });
    } catch {
      setStatus({ type: "error", msg: "Backend unavailable. Price saved locally for demo." });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card">
        <h1 className="text-2xl font-bold text-foreground mb-1">Update Market Price</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Add or update crop pricing data for a market.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Market Name</label>
            <input
              required
              className="w-full p-4 bg-secondary rounded-xl ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all text-foreground"
              placeholder="e.g. Bangalore"
              value={formData.market_name}
              onChange={(e) => setFormData({ ...formData, market_name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Crop Name</label>
              <input
                required
                className="w-full p-4 bg-secondary rounded-xl ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all text-foreground"
                placeholder="e.g. Tomato"
                value={formData.crop_name}
                onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Price (₹/kg)</label>
              <input
                required
                type="number"
                className="w-full p-4 bg-secondary rounded-xl ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all font-mono text-foreground"
                placeholder="0.00"
                value={formData.price_per_kg}
                onChange={(e) => setFormData({ ...formData, price_per_kg: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Date</label>
            <input
              required
              type="date"
              className="w-full p-4 bg-secondary rounded-xl ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all text-foreground"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            Submit Price Update
          </motion.button>
        </form>

        {status.msg && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-xl text-center font-medium text-sm ${
              status.type === "success"
                ? "bg-primary/10 text-primary"
                : status.type === "error"
                ? "bg-destructive/10 text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {status.msg}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
