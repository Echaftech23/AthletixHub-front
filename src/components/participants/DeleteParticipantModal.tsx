import React from 'react';
import { ParticipantDto } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,  
} from "@/components/ui/dialog";
import { useParticipants } from "@/hooks/useParticipants";
import { toast } from "sonner";

interface DeleteParticipantModalProps {
  participant: ParticipantDto | null;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteParticipantModal: React.FC<DeleteParticipantModalProps> = ({ participant, onClose, onConfirm }) => {
  const { deleteParticipant } = useParticipants();

  const handleDelete = async () => {
    if (participant) {
      try {
        console.log("Deleting participant:", participant._id); // Debug log
        await deleteParticipant(participant._id);
        toast.success("Participant deleted successfully!");
        onConfirm();
      } catch (error) {
        console.error("Failed to delete participant:", error);
        toast.error("Failed to delete participant. Please try again later.");
      }
    }
  };

  if (!participant) return null;

  return (
    <Dialog open={!!participant} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the participant {participant.username}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteParticipantModal;