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
import { Input } from "@/components/ui/input";
import { UpdateparticipantValidationSchema } from "@/validations/participantValidation";
import { Formik, Form, Field } from 'formik';
import { useParticipants } from "@/hooks/useParticipants";

interface EditParticipantModalProps {
  participant: ParticipantDto | null;
  onClose: () => void;
  onSubmit: (participant: ParticipantDto) => void;
}

const EditParticipantModal: React.FC<EditParticipantModalProps> = ({ participant, onClose, onSubmit }) => {
  const { updateParticipant } = useParticipants();

  if (!participant) return null;

  return (
    <Dialog open={!!participant} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Participant</DialogTitle>
          <DialogDescription>
            Update the participant details
          </DialogDescription>
        </DialogHeader>
        
        <Formik
          initialValues={participant}
          validationSchema={UpdateparticipantValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateParticipant(participant._id, values);
              onSubmit(values);
            } catch (error) {
              console.error('Failed to update participant', error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  as={Input}
                  name="username"
                  placeholder="Full Name"
                  className={touched.username && errors.username ? 'border-red-500' : ''}
                />
                {touched.username && errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <Field
                  as={Input}
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={touched.email && errors.email ? 'border-red-500' : ''}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Field
                  as={Input}
                  name="phone"
                  placeholder="Phone Number"
                  className={touched.phone && errors.phone ? 'border-red-500' : ''}
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditParticipantModal;