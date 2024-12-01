import * as Yup from 'yup';

export const participantValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(30, 'Name must be at most 30 characters')
        .lowercase('Name must be lowercase'),

    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),

    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\+?[0-9\s\-()]{10,25}$/, 'Phone number must be between 10 and 25 digits and can include country code, spaces, dashes, and parentheses'),

    eventId: Yup.string()
        .required('Event is required')
});



export const UpdateparticipantValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(30, 'Name must be at most 30 characters')
        .lowercase('Name must be lowercase'),

    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),

    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\+?[0-9\s\-()]{10,25}$/, 'Phone number must be between 10 and 25 digits and can include country code, spaces, dashes, and parentheses'),
});