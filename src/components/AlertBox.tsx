import { TrendingUp, AlertTriangle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

interface AlertItem {
  id: number;
  message: string;
  type: "opportunity" | "increase" | "warning";
  time: string;
}

interface AlertBoxProps {
  alerts: AlertItem[];
}

const iconMap = {
  opportunity: ArrowUpRight,
  increase: TrendingUp,
  warning: AlertTriangle,
};

const colorMap = {
  opportunity: "bg-primary/10 text-primary",
  increase: "bg-accent/10 text-accent",
  warning: "bg-destructive/10 text-destructive",
};

const AlertBox = ({ alerts }: AlertBoxProps) => {
  return (
    <div className="space-y-3">
      {alerts.map((alert, idx) => {
        const Icon = iconMap[alert.type];
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-4 p-4 bg-card rounded-xl shadow-card"
          >
            <div className={`p-2 rounded-lg ${colorMap[alert.type]}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{alert.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AlertBox;
