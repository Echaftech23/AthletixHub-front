import { TrafficChart } from '../charts/traffic-chart';

export function ChartsGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <TrafficChart />
    </div>
  );
}