import { useState } from 'react';
import { ParticipantDto } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2 } from 'lucide-react';
import EditParticipantModal from './EditParticipantModal';
import DeleteParticipantModal from './DeleteParticipantModal';

interface ParticipantsProps {
  participants: ParticipantDto[];
  onParticipantDeleted?: (id: string) => void;
  onParticipantEdited?: (participant: ParticipantDto) => void;
}

const Participants = ({ 
  participants, 
  onParticipantDeleted, 
  onParticipantEdited 
}: ParticipantsProps) => {
  const [deleteParticipant, setDeleteParticipant] = useState<ParticipantDto | null>(null);
  const [editParticipant, setEditParticipant] = useState<ParticipantDto | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteParticipant) {
      onParticipantDeleted?.(deleteParticipant._id);
      setDeleteParticipant(null);
    }
  };

  const handleEditSubmit = (values: ParticipantDto) => {
    onParticipantEdited?.(values);
    setEditParticipant(null);
  };

  return (
    <>
      <div className="participants-container border">
        <Table>
          <TableHeader className="bg-slate-300">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No participants found
                </TableCell>
              </TableRow>
            ) : (
              participants.map((participant) => (
                <TableRow key={participant._id}>
                  <TableCell>{participant._id}</TableCell>
                  <TableCell>{participant.username}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.phone}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => setEditParticipant(participant)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        onClick={() => setDeleteParticipant(participant)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteParticipantModal
        participant={deleteParticipant}
        onClose={() => setDeleteParticipant(null)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Edit Participant Dialog */}
      <EditParticipantModal
        participant={editParticipant}
        onClose={() => setEditParticipant(null)}
        onSubmit={handleEditSubmit}
      />
    </>
  );
};

export default Participants;