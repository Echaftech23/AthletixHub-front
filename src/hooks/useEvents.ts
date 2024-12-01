import axiosInstance from '@/api/config/axios';
import { EventDto } from '@/types';

export interface EventResponse extends EventDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventService {
  createEvent: (eventData: EventDto) => Promise<EventResponse>;
  getEvents: () => Promise<{ events: EventResponse[] }>;
  getEventById: (id: string) => Promise<EventResponse>;
  updateEvent: (id: string, eventData: Partial<EventDto>) => Promise<EventResponse>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEvents = (): EventService => {

  const createEvent = async (eventData: EventDto): Promise<EventResponse> => {
    const response = await axiosInstance.post<EventResponse>('/events', eventData);
    return response.data;
  };

  const getEvents = async (): Promise<{ events: EventResponse[] }> => {
    const response = await axiosInstance.get<{ events: EventResponse[] }>('/events');
    return response.data;
  };

  const getEventById = async (id: string): Promise<EventResponse> => {
    const response = await axiosInstance.get<EventResponse>(`/events/${id}`);
    return response.data;
  };

  const updateEvent = async (
    id: string, 
    eventData: Partial<EventDto>
  ): Promise<EventResponse> => {
    const response = await axiosInstance.put<EventResponse>(`/events/${id}`, eventData);
    return response.data;
  };

  const deleteEvent = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/events/${id}`);
  };

  return {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
  };
};