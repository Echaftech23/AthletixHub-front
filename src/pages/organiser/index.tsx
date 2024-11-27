import { MainLayout } from '@/components/layout/main-layout';
import { DashboardHeader } from '@/components/dashboard/header';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import { ChartsGrid } from '@/components/dashboard/charts-grid';

const dashboard = () => {
  return (
    <MainLayout>
      <DashboardHeader />
      <StatsGrid />
      <ChartsGrid />
    </MainLayout>
  )
}

export default dashboard