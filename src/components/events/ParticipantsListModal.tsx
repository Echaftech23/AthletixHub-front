import { useState, useEffect } from 'react';
import { FaUsers, FaXmark } from 'react-icons/fa6';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/exportUtils';

interface Participant {
  _id?: string;
  id?: string;
  username?: string;
  email?: string;
  phone?: string;
}

interface ParticipantsModalProps {
  eventId: string;
  participants: Participant[];
  onClose?: () => void;
}

export function ParticipantsListModal({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  eventId, 
  participants, 
  onClose 
}: ParticipantsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredParticipants, setFilteredParticipants] = useState<Participant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Normalize participant data
  const normalizeParticipants = (participants: Participant[]): Participant[] => {
    return participants.map(participant => ({
      _id: participant._id || participant.id || '',
      username: participant.username || 'Unknown',
      email: participant.email || '',
      phone: participant.phone || ''
    })).filter(p => p._id);
  }

  useEffect(() => {
    // Normalize participants when component mounts or participants change
    const normalized = normalizeParticipants(participants);
    setFilteredParticipants(normalized);
  }, [participants]);

  useEffect(() => {
    // Filter participants when search term changes
    const filtered = filteredParticipants.filter(participant => 
        ['username', 'email', 'phone'].some(field => 
          participant[field]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredParticipants(filtered);
  }, [searchTerm]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(filteredParticipants, 'participants-list');
      toast.success('PDF downloaded successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <Button 
        onClick={openModal} 
        variant="outline"
        className="flex items-center space-x-2"
      >
        <FaUsers />
        <span>Participants ({filteredParticipants.length})</span>
      </Button>

      {/* Rest of the component remains the same */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          {/* Modal Container */}
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">
                Event Participants ({filteredParticipants.length})
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaXmark className="text-2xl" />
              </button>
            </div>

            {/* Search Input and Export Button */}
            <div className="p-4 flex justify-between items-center">
              <input 
                type="text"
                placeholder="Search participants..."
                className="w-full px-3 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                onClick={handleExportPDF} 
                variant="outline"
                className="ml-2 flex items-center space-x-2"
              >
                <FileText />
                <span>Export</span>
              </Button>
            </div>

            {/* Participants List */}
            <div className="overflow-y-auto flex-grow">
              {filteredParticipants.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No participants found
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                      <th className="p-3 text-left">Phone</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant) => (
                      <tr 
                        key={participant._id} 
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="p-3">{participant.username}</td>
                        <td className="p-3">{participant.email}</td>
                        <td className="p-3">{participant.phone}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-red-600"
                            >
                              delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}