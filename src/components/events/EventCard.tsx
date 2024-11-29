import { Event } from '@/types/events';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden rounded-md">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{event.artist}</h3>
        <p className="text-sm text-gray-600 mb-4">{event.title}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
            <Clock className="w-4 h-4 ml-4 mr-2" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.venue}, {event.location}</span>
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <div className="flex space-x-3">
            <button
              className="w-full py-2 px-4 bg-green-300 font-semibold rounded-sm hover:bg-green-400"
            >
              Edit Event
            </button>

            <button
              className="w-full py-2 px-4 bg-primary text-white rounded-sm hover:bg-primary/90"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}