import React from "react";
import { EventInfo } from "./EventInfo";

interface EventDetailsProps {
  event: {
    title: string;
    imageUrl: string;
    owner: string;
    date: string;
    address: string;
    description: string;
  };
}

export function EventDetail({ event }: EventDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Image and Title */}
        <div className="lg:col-span-2">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full rounded-sm mb-6"
          />
          <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
          <div className="space-y-6">
            <div>
              <h3 className="flex items-center gap-2 mb-2">
              </h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>
        </div>

        {/* Event Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-sm shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              Détails de l'événement
            </h2>
            <EventInfo
              date={event.date}
              location={event.address}
              time={event.time}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
