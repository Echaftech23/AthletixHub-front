import { MainLayout } from '@/components/layout/main-layout';
import Participants from '@/components/participants/participants';
// import { useEffect, useState } from "react";
import { Modal } from "@/components/participants/popover";
// import { useParticapants } from "@/hooks/useparticapants";
// import Loader from "@/components/ui/loader";
// import { EventGrid } from '@/components/particapants/EventGrid';
// import { EventDto } from '@/types';
// import { toast } from 'sonner';

const Dashboard = () => {
//    const { getParticapants } = useParticapants();
//    const [loading, setLoading] = useState(true);
//    const [particapants, setParticapants] = useState<EventDto[]>([]);

//    useEffect(() => {
//      fetchParticapants();
//    }, []);

//    const fetchParticapants = async () => {
//      try {
//        const particapants = await getParticapants();
//        setParticapants(particapants);
//      } catch (error) {
//        console.error("Failed to fetch particapants:", error);
//        toast.error("Failed to fetch particapants. Please try again later.");
//      } finally {
//        setLoading(false);
//      }
//    };

   const handleParticipantCreated = async (newParticipant: ParticipantDto) => {
      setParticapants([...particapants, newParticipant]);
   };

//    const handleEventDeleted = async (deletedEventId: string) => {
//     setparticapants(particapants.filter(event => event._id !== deletedEventId));
//    };

//    const handleEventEdited = async (updatedEvent: EventDto) => {
//       setparticapants(particapants.map(event => 
//         event._id === updatedEvent._id ? updatedEvent : event
//       ));
//    };

   return (
     <MainLayout>
       <header className="flex justify-between items-center mb-8">
         <div>
           <h1 className="text-3xl font-bold text-gray-900">Participants</h1>
           <p className="text-gray-600">Welcome back to your dashboard</p>
         </div>
         <Modal title="Add Participant" buttonText="Participant" onParticipantCreated={handleParticipantCreated} />
       </header>
       
       <main className="max-w-7xl mx-auto pb-8">
         {/* {loading ? (
           <div className='h-[80svh] flex items-center justify-center'>
             <Loader />
           </div>
         ) : (
            <EventGrid 
             particapants={particapants} 
             loading={loading} 
             onEventDeleted={handleEventDeleted} 
             onEventEdited={handleEventEdited} 
             error={null} 
           />
            <p>Participants</p>
         )} */}

         <Participants />
       </main>
     </MainLayout>
   )
}

export default Dashboard;
