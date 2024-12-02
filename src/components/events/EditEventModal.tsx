/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik } from "formik";
import { EventDto } from "@/types";
import { eventValidationSchema } from "@/validations/EventValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEvents } from "@/hooks/useEvents";
import { FaXmark } from "react-icons/fa6";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EditEventModalProps {
  isOpen: boolean;
  event: EventDto;
  onEdit: (updatedEvent: EventDto) => void;
  onClose: () => void;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({
  isOpen,
  event,
  onEdit,
  onClose,
}) => {
  const { updateEvent } = useEvents();

  const initialValues: EventDto = {
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    // address: {
    //   venue: event.address.venue,
    //   location: event.address.location,
    // },
    address: event.address,
    price: event.price,
    capacity: event.capacity,
    imageUrl: event.imageUrl ,
    _id: event._id,
  };

  const handleSubmit = async ( values: EventDto ) => {
    try {
        const updatedEvent = await updateEvent(event._id, values);
        onEdit(updatedEvent);
        onClose();
        toast.success("Event updated successfully!");
    } catch (error) {
        onClose();
        console.error("Failed to edit event:", error);
        toast.error("Failed to edit event. Please try again later.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-4 bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-md shadow-lg w-full max-w-md">
        <div className="flex justify-between p-4 items-center border-b">
          <h2 className="text-xl font-semibold">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaXmark className="text-2xl" />
          </button>
        </div>
        <div className="p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={eventValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Input */}
                <div>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.title && errors.title ? "border-red-500" : ""
                    }`}
                  />
                  {touched.title && errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description Input */}
                <div>
                  <Textarea
                    name="description"
                    placeholder="Event Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.description && errors.description
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {touched.description && errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div>
                    <Input
                      type="date"
                      name="date"
                      placeholder="Event Date"
                      min={new Date().toISOString().split("T")[0]}
                      value={values.date ? new Date(values.date).toISOString().split("T")[0] : ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full ${
                        touched.date && errors.date ? "border-red-500" : ""
                      }`}
                    />
                    {touched.date && errors.date && (
                      <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                    )}
                  </div>

                  {/* Time Input */}
                  <div>
                    <Input
                      type="time"
                      name="time"
                      placeholder="Event Time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full ${
                        touched.time && errors.time ? "border-red-500" : ""
                      }`}
                    />
                    {touched.time && errors.time && (
                      <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                    )}
                  </div>
                </div>

                {/* Address Input */}
                <div>
                      <Input
                        type="text"
                        name="address"
                        placeholder="Event Address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full ${
                          touched.address && errors.address
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      {touched.address && errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Price Input */}
                  <div>
                    <Input
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      placeholder="Ticket Price"
                      value={values.price }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full ${
                        touched.price && errors.price ? "border-red-500" : ""
                      }`}
                    />
                    {touched.price && errors.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.price}
                      </p>
                    )}
                  </div>

                  {/* Capacity Input */}
                  <div>
                    <Input
                      type="number"
                      name="capacity"
                      min="3"
                      placeholder="Event Capacity"
                      value={values.capacity }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full ${
                        touched.capacity && errors.capacity
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {touched.capacity && errors.capacity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.capacity}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image URL Input */}
                <div>
                  <Input
                    type="file"
                    name="imageUrl"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.imageUrl && errors.imageUrl
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {touched.imageUrl && errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.imageUrl}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                        </>
                        ) : ( 'Delete Event' )
                    }
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};