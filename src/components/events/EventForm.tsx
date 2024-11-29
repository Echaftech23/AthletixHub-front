/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { EventDto } from "@/types";
import { eventValidationSchema } from "@/validations/EventValidation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";

export const EventForm = () => {
  const { createEvent, loading, error } = useEvents();
  const [success, setSuccess] = useState<string | null>(null);

  const initialValues: EventDto = {
    title: "",
    description: "",
    date: "",
    time: "",
    address: {
      venue: "",
      location: "",
    },
    price: 0,
    capacity: 0,
    imageUrl: "",
    _id: undefined
  };

  const handleSubmit = async (
    values: EventDto,
    { setSubmitting }: FormikHelpers<EventDto>
  ) => {
    try {
      await createEvent(values);
      setSuccess("Event created successfully!");

    } catch (error: any) {
      console.error("Failed to create event.", error);
      const errorMessage =
        error.response?.data?.message?.message[0] || "An error occurred";
      setError(
        typeof errorMessage === "string"
          ? errorMessage
          : JSON.stringify(errorMessage)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={eventValidationSchema}
      onSubmit={handleSubmit}
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
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Event Creation Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

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
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date Input */}
            <div>
              <Input
                type="date"
                name="date"
                placeholder="Event Date"
                value={values.date}
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

          {/* Venue Input */}
          <div>
            <Input
              type="text"
              name="address.venue"
              placeholder="Event Venue"
              value={values.address.venue}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${
                touched.address?.venue && errors.address?.venue
                  ? "border-red-500"
                  : ""
              }`}
            />
            {touched.address?.venue && errors.address?.venue && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.venue}
              </p>
            )}
          </div>

          {/* Location Input */}
          <div>
            <Input
              type="text"
              name="address.location"
              placeholder="Event Location"
              value={values.address.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${
                touched.address?.location && errors.address?.location
                  ? "border-red-500"
                  : ""
              }`}
            />
            {touched.address?.location && errors.address?.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.location}
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
                value={values.price || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full ${
                  touched.price && errors.price ? "border-red-500" : ""
                }`}
              />
              {touched.price && errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Capacity Input */}
            <div>
              <Input
                type="number"
                name="capacity"
                min="3"
                placeholder="Event Capacity"
                value={values.capacity || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full ${
                  touched.capacity && errors.capacity ? "border-red-500" : ""
                }`}
              />
              {touched.capacity && errors.capacity && (
                <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
              )}
            </div>
          </div>

          {/* Image URL Input */}
          <div>
            <Input
              type="file"
              name="imageUrl"
              value={values.imageUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full ${
                touched.imageUrl && errors.imageUrl ? "border-red-500" : ""
              }`}
            />
            {touched.imageUrl && errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="w-full bg-black text-white hover:bg-gray-800"
          >
            {isSubmitting || loading ? "Creating..." : "Create Event"}
          </Button>
        </form>
      )}
    </Formik>
  );
};