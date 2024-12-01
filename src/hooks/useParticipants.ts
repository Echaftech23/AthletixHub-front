import axiosInstance from '@/api/config/axios';
import { ParticipantDto } from '@/types';

export interface ParticipantResponse extends ParticipantDto {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantService {
  createParticipant: (participantData: ParticipantDto) => Promise<ParticipantResponse>;
  getParticipants: () => Promise<{ participants: ParticipantResponse[] }>;
  getParticipantById: (id: string) => Promise<ParticipantResponse>;
  updateParticipant: (id: string, participantData: Partial<ParticipantDto>) => Promise<ParticipantResponse>;
  deleteParticipant: (id: string) => Promise<void>;
}

export const useParticipants = (): ParticipantService => {

  const createParticipant = async (participantData: ParticipantDto): Promise<ParticipantResponse> => {
    const response = await axiosInstance.post<ParticipantResponse>('/participants', participantData);
    return response.data;
  };

  const getParticipants = async (): Promise<{ participants: ParticipantResponse[] }> => {
    const response = await axiosInstance.get<{ participants: ParticipantResponse[] }>('/participants');
    return response.data;
  };

  const getParticipantById = async (id: string): Promise<ParticipantResponse> => {
    const response = await axiosInstance.get<ParticipantResponse>(`/participants/${id}`);
    return response.data;
  };

  const updateParticipant = async (
    id: string, 
    participantData: Partial<ParticipantDto>
  ): Promise<ParticipantResponse> => {
    const response = await axiosInstance.put<ParticipantResponse>(`/participants/${id}`, participantData);
    return response.data;
  };

  const deleteParticipant = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/participants/${id}`);
  };

  return {
    createParticipant,
    getParticipants,
    getParticipantById,
    updateParticipant,
    deleteParticipant,
  };
};