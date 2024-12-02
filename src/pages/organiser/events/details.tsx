import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '@/components/layout/main-layout';
import { EventDetail } from '@/components/events/EventDetail';
// import { Modal } from '@/components/ui/Modal';
import { useEvents } from '@/hooks/useEvents';
import { ParticipantsListModal } from '@/components/events/ParticipantsListModal';

function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const { getEventById } = useEvents();
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      
      try {
        const fetchedEvent = await getEventById(eventId);
        setEvent(fetchedEvent);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  return (
    <MainLayout>
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Details</h1>
        </div>
        {event && (
          <div className="flex space-x-2">
            {/* Participant Registration Modal */}
            {/* <ParticipantModal 
              eventId={event._id}
              title="Register for Event"
              buttonText="Register"
            /> */}

            {/* Participants List Modal */}
            <ParticipantsListModal
              eventId={event._id}
              participants={event.participants}
            />
          </div>
        )}
      </header>
      
      <main className="max-w-7xl mx-auto">
        {event && <EventDetail event={event} />}
      </main>
    </MainLayout>
  );
}

export default EventDetails;