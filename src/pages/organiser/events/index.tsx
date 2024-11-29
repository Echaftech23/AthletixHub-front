import { MainLayout } from '@/components/layout/main-layout';
import { useEffect, useState } from "react";
import { Modal } from '@/components/events/popover';
import { useEvents } from "@/hooks/useEvents";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Loader from "@/components/ui/loader";
import { EventGrid } from '@/components/events/EventGrid';
import { EventDto } from '@/types';

const Dashboard = () => {
  const { getEvents, loading, error } = useEvents();
  const [events, setEvents] = useState<EventDto[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const events = await getEvents();
      setEvents(events);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleEventCreated = (newEvent: EventDto) => {
    setEvents([...events, newEvent]);
  };

  const handleEventDeleted = (deletedEventId: string) => {
    setEvents(events.filter(event => event._id !== deletedEventId));
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 3000);

  };

  return (
    <MainLayout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back to your dashboard</p>
        </div>
        <Modal title="Add Event" buttonText="Event" onEventCreated={handleEventCreated} />
      </header>

      <main className="max-w-7xl mx-auto pb-8">
        {loading ? (
          <div className='h-[80svh] flex items-center justify-center'>
            <Loader />
          </div>
        ) : (
          <>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <EventGrid events={events} loading={loading} error={error} onEventDeleted={handleEventDeleted} />
          </>
        )}

          <div
            className={`fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out ${
              isAlertVisible ? 'translate-y-0' : 'translate-x-[200%]'
            }`}
          >
            Event deleted successfully!
          </div>
      </main>
    </MainLayout>
  )
}

export default Dashboard;