import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  icon: ReactNode;
}

const StatCard = ({ label, value, sub, icon }: StatCardProps) => (
  <motion.div
    whileTap={{ scale: 0.97 }}
    className="p-4 bg-card rounded-2xl shadow-card"
  >
    <div className="text-primary mb-3">{icon}</div>
    <div className="text-xs font-medium text-muted-foreground mb-1">{label}</div>
    <div className="text-xl font-bold text-foreground">{value}</div>
    {sub && <div className="text-xs font-bold text-primary">{sub}</div>}
  </motion.div>
);

export default StatCard;
