import { MainLayout } from "@/components/layout/main-layout";
import { Modal } from "@/components/participants/popover";
import Participants from "@/components/participants/participants";
import { useEffect, useState } from "react";
import { useParticipants } from "@/hooks/useParticipants";
import Loader from "@/components/ui/loader";
import { ParticipantDto } from "@/types";
import { toast } from "sonner";

const Dashboard = () => {
  const { getParticipants } = useParticipants();
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState<ParticipantDto[]>([]);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const fetchedParticipants = await getParticipants();
      setParticipants(fetchedParticipants);
    } catch (error) {
      console.error("Failed to fetch participants:", error);
      toast.error("Failed to fetch participants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantCreated = (newParticipant: ParticipantDto) => {
    setParticipants([...participants, newParticipant]);
  };

  const handleParticipantDeleted = (deletedParticipantId: string) => {
    setParticipants(
      participants.filter(
        (participant) => participant._id !== deletedParticipantId
      )
    );
  };

  const handleParticipantEdited = (updatedParticipant: ParticipantDto) => {
    setParticipants(
      participants.map((participant) =>
        participant._id === updatedParticipant._id
          ? updatedParticipant
          : participant
      )
    );
  };

  return (
    <MainLayout>
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Participants</h1>
          <p className="text-gray-600">Welcome back to your dashboard</p>
        </div>
        <Modal
          title="Add Participant"
          buttonText="Participant"
          onParticipantCreated={handleParticipantCreated}
        />
      </header>

      <main className="max-w-7xl mx-auto pb-8">
        {loading ? (
          <div className="h-[80svh] flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <Participants
            participants={participants} 
            onParticipantDeleted={handleParticipantDeleted}
            onParticipantEdited={handleParticipantEdited}
          />
        )}
      </main>
    </MainLayout>
  );
};

export default Dashboard;
