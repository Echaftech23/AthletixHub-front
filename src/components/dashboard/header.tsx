import { Modal } from '@/components/events/popover';
import { EventForm } from '@/components/events/EventForm';
import { ParticipantForm } from '@/components/participants/ParticipantForm';

export function DashboardHeader({ title, subtitle, buttonText }: {title: string, subtitle: string, buttonText?: string}) {
  const getForm = () => {
    switch(buttonText?.toLowerCase()) {
      case 'event': return <EventForm />;
      case 'participant': return <ParticipantForm />;
      default: return null;
    }
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-600">{subtitle}</p>
      </div>

      {buttonText && (
        <Modal title={`Add ${buttonText}`} buttonText={buttonText}>
          {getForm()}
        </Modal>
      )}
    </header>
  );
}