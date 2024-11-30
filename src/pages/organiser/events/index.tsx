import { MainLayout } from '@/components/layout/main-layout';
import { useEffect, useState } from "react";
import { Modal } from '@/components/events/popover';
import { useEvents } from "@/hooks/useEvents";
import Loader from "@/components/ui/loader";
import { EventGrid } from '@/components/events/EventGrid';
import { EventDto } from '@/types';
import { toast } from 'sonner';

const Dashboard = () => {
   const { getEvents } = useEvents();
   const [loading, setLoading] = useState(true);
   const [events, setEvents] = useState<EventDto[]>([]);

   useEffect(() => {
     fetchEvents();
   }, []);

   const fetchEvents = async () => {
     try {
       const events = await getEvents();
       setEvents(events);
     } catch (error) {
       console.error("Failed to fetch events:", error);
       toast.error("Failed to fetch events. Please try again later.");
     } finally {
       setLoading(false);
     }
   };

   const handleEventCreated = async (newEvent: EventDto) => {
      setEvents([...events, newEvent]);
   };

   const handleEventDeleted = async (deletedEventId: string) => {
    setEvents(events.filter(event => event._id !== deletedEventId));
   };

   const handleEventEdited = async (updatedEvent: EventDto) => {
      setEvents(events.map(event => 
        event._id === updatedEvent._id ? updatedEvent : event
      ));
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
           <EventGrid 
             events={events} 
             loading={loading} 
             onEventDeleted={handleEventDeleted} 
             onEventEdited={handleEventEdited} 
             error={null} 
           />
         )}
       </main>
     </MainLayout>
   )
}

export default Dashboard;