import { useState, ReactNode, useEffect } from "react";
import { FaCirclePlus, FaXmark } from "react-icons/fa6";
import { Formik } from "formik";
import { ParticipantDto, EventDto } from "@/types";
import { participantValidationSchema } from "@/validations/participantValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEvents } from "@/hooks/useEvents";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParticipants } from "@/hooks/useParticipants";
import { toast } from "sonner";

interface ModalProps {
  trigger?: ReactNode;
  title: string;
  buttonText?: string;
  onParticipantCreated: (event: ParticipantDto) => void;
}

export function Modal({
  trigger,
  title,
  buttonText,
  onParticipantCreated,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState<EventDto[]>([]);
  const { createParticipant } = useParticipants();
  const { getEvents } = useEvents();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      console.log("Fetched Events:", fetchedEvents);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to load events. Please try again later.");
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const initialValues: ParticipantDto = {
    username: "",
    email: "",
    phone: "",
    eventId: "",
  };

  const handleSubmit = async (values: ParticipantDto, { setSubmitting }) => {
    try {
      console.log("Submitting Participant Full Values:", values);

      const newParticipant = await createParticipant(values);
      console.log("API Response:", newParticipant); // Log the API response

      onParticipantCreated(newParticipant);
      setIsOpen(false);
      toast.success("Participant created successfully!");
    } catch (error) {
      // More detailed error logging
      console.error("Failed to create Participant Full Error:", error);
      console.error(
        "Error Details:",
        JSON.stringify(error, Object.getOwnPropertyNames(error))
      );

      toast.error(
        `Failed to create Participant: ${error.message || "Unknown error"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {buttonText ? (
        <button
          onClick={openModal}
          className="flex items-center py-2 px-3 bg-primary text-white space-x-2 rounded-sm font-semibold hover:bg-primary/90"
        >
          <FaCirclePlus className="text-white text-2xl" />
          <p className="-mt-1">Add {buttonText}</p>
        </button>
      ) : (
        trigger && <div onClick={openModal}>{trigger}</div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">{title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900"
              >
                <FaXmark className="text-2xl" />
              </button>
            </div>
            <div className="p-4">
              <Formik
                initialValues={initialValues}
                validationSchema={participantValidationSchema}
                onSubmit={handleSubmit}
                // Add these optional props for debugging
                validateOnBlur={true}
                validateOnChange={true}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    // Add these for additional debugging
                    onSubmitCapture={(e) => {
                      console.log("Form submit captured", e);
                      console.log("Current form values:", values);
                      console.log("Current form errors:", errors);
                    }}
                  >
                    {/* Username Input */}
                    <div>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Participant Name"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full ${
                          touched.username && errors.username
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {touched.username && errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.username}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Participant Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full ${
                          touched.email && errors.email ? "border-red-500" : ""
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Event ID Input by Select */}
                    <div>
                      <Select
                        value={values.eventId}
                        onValueChange={(value) => {
                          console.log("Event selected:", value); // Add this line
                          setFieldValue("eventId", value);
                          handleBlur({ target: { name: "eventId" } });
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Event"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Available Events</SelectLabel>
                            {events.length === 0 ? (
                              <SelectItem value="" disabled>
                                No events available
                              </SelectItem>
                            ) : (
                              events.map((event) => (
                                <SelectItem key={event.id} value={event._id}>
                                  {event.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      {touched.eventId && errors.eventId && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.eventId}
                        </p>
                      )}
                    </div>

                    {/* Phone Input */}
                    <div>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Participant Phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full ${
                          touched.phone && errors.phone ? "border-red-500" : ""
                        }`}
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={(e) => {
                        console.log("Button clicked", values); // Add this line
                        // Prevent default to ensure Formik handles submission
                        // e.preventDefault();
                      }}
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      {isSubmitting ? "Creating..." : "Create Participant"}
                    </Button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
