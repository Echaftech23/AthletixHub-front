import { DollarSign, ShoppingCart, FileText, Users } from 'lucide-react';
import { StatsCard } from '../stats-card';

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        icon={<DollarSign className="h-6 w-6 text-blue-600" />}
        label="Revenue"
        value="$23,569"
      />
      <StatsCard
        icon={<ShoppingCart className="h-6 w-6 text-green-600" />}
        label="Sales"
        value="3,435"
      />
      <StatsCard
        icon={<FileText className="h-6 w-6 text-yellow-600" />}
        label="Templates"
        value="349"
      />
      <StatsCard
        icon={<Users className="h-6 w-6 text-purple-600" />}
        label="Clients"
        value="2,986"
      />
    </div>
  );
}