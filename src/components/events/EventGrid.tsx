import { EventCard } from "./EventCard";
import { EventDto } from "@/types";

interface EventGridProps {
  events: EventDto[];
  loading: boolean;
  error: string | null;
  onEventDeleted: (deletedEventId: string) => void;
  onEventEdited: (event: EventDto) => void;
}

export function EventGrid({ events, onEventDeleted, onEventEdited }: EventGridProps) {
  if (!events.length) {
    return <p className="flex items-center justify-center h-[70svh]">No events available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard 
          key={String(event._id)} 
          event={event} 
          onEventDeleted={onEventDeleted} 
          onEventEdited={onEventEdited}
        />
      ))}
    </div>
  );
}