import { EventCard } from "./EventCard";
import { EventDto } from "@/types";

interface EventGridProps {
  events: EventDto[];
  loading: boolean;
  error: string | null;
  onEventDeleted: (deletedEventId: string) => void;
}

export function EventGrid({ events, onEventDeleted }: EventGridProps) {
  if (!events.length) {
    return <p>No events available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
      <EventCard key={event._id?.toString()} event={event} onEventDeleted={onEventDeleted} />
      ))}
    </div>
  );
}