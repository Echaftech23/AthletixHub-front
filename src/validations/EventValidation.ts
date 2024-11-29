import * as Yup from 'yup';

export const eventValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Event title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  
  description: Yup.string()
    .required('Event description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),
  
  date: Yup.date()
    .required('Event date is required')
    .min(new Date(), 'Event date must be in the future'),
  
  time: Yup.string()
    .required('Event time is required'),
  
  address: Yup.object().shape({
    venue: Yup.string()
      .required('Venue is required')
      .min(3, 'Venue must be at least 3 characters'),
    location: Yup.string()
      .required('Location is required')
      .min(3, 'Location must be at least 3 characters'),
  }),
  
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .test('two-decimal-places', 'Price must have up to two decimal places', 
      (value) => value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
    ),
  
  capacity: Yup.number()
    .required('Capacity is required')
    .positive('Capacity must be a positive number')
    .integer('Capacity must be a whole number'),
  
  imageUrl: Yup.string()
    .required('Image is required')
});