import { MainLayout } from '@/components/layout/main-layout';
import { DashboardHeader } from '@/components/dashboard/header';
import { EventGrid } from '@/components/events/EventGrid';

const dashboard = () => {
  return (
    <MainLayout>
      <DashboardHeader title="Dashboard" subtitle="Welcome back to your dashboard" buttonText="Event" />
      <main className="max-w-7xl mx-auto pb-8">
        <EventGrid />
      </main>
    </MainLayout>
  )
}

export default dashboard