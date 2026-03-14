import AlertBox from "@/components/AlertBox";
import { mockData } from "@/lib/api";

const Alerts = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
        Price Alerts
      </h1>
      <p className="text-muted-foreground mb-6">
        Stay informed about significant price changes and market opportunities.
      </p>

      <AlertBox alerts={mockData.alerts} />
    </div>
  );
};

export default Alerts;
