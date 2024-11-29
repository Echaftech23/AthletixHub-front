/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
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

export const useEvents = (): EventService & { loading: boolean; error: string | null } => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createEvent = async (eventData: EventDto): Promise<EventResponse> => {
    setLoading(true);
    setError(null);
    const response = await axiosInstance.post<EventResponse>('/events', eventData);
    setLoading(false);
    return response.data;
  };

  const getEvents = async (): Promise<{ events: EventResponse[] }> => {
    setLoading(true);
    setError(null);
    const response = await axiosInstance.get<{ events: EventResponse[] }>('/events');
    setLoading(false);
    return response.data;
  };

  const getEventById = async (id: string): Promise<EventResponse> => {
    setLoading(true);
    setError(null);
    const response = await axiosInstance.get<EventResponse>(`/events/${id}`);
    setLoading(false);
    return response.data;
  };

  const updateEvent = async (
    id: string, 
    eventData: Partial<EventDto>
  ): Promise<EventResponse> => {
    setLoading(true);
    setError(null);
    const response = await axiosInstance.put<EventResponse>(`/events/${id}`, eventData);
    setLoading(false);
    return response.data;
  };

  const deleteEvent = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    await axiosInstance.delete(`/events/${id}`);
    setLoading(false);
  };

  return {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    loading,
    error
  };
};