import { MainLayout } from '@/components/layout/main-layout';
import { DashboardHeader } from '@/components/dashboard/header';
import { EventGrid } from '@/components/events/EventGrid';

const dashboard = () => {
  return (
    <MainLayout>
      <DashboardHeader title="Dashboard" subtitle="Welcome back to your dashboard" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventGrid />
      </main>
    </MainLayout>
  )
}

export default dashboard