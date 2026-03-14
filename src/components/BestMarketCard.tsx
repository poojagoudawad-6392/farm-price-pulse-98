import { Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface BestMarketCardProps {
  market: string;
  crop: string;
  price: number;
}

const BestMarketCard = ({ market, crop, price }: BestMarketCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-active"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <Award size={20} />
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">
            Best Market for {crop}
          </span>
        </div>
        <div className="text-2xl font-bold mb-1">{market} Market</div>
        <div className="text-3xl font-bold tabular-nums">
          ₹{price}/kg
        </div>
        <Link
          to="/search"
          className="inline-flex items-center gap-1 mt-4 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity"
        >
          View all markets <ArrowRight size={14} />
        </Link>
      </div>
      <div className="absolute right-[-10%] bottom-[-20%] opacity-10">
        <Award size={140} />
      </div>
    </motion.div>
  );
};

export default BestMarketCard;
