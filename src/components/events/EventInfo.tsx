import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { formatDate } from "@/helpers/dateHelpers";

interface EventInfoProps {
  date: string;
  location: string;
  time: string;
}

export function EventInfo({ date, location, time }: EventInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-600" />
        <div>
          <h3 className="font-medium">Date et heure</h3>
          <p className="text-gray-600">{formatDate(date)}, {time}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-gray-600" />
        <div>
          <h3 className="font-medium">Location</h3>
          <p className="text-gray-600">{location}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Event Details button */}
        <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Participants</button>
          </div>

          <div className="mt-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md">Add Participant</button>
          </div>
        </div>
    </div>
  );
}