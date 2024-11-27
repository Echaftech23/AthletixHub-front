import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .lowercase('Username must be lowercase'),
  
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\+?[0-9\s\-()]{10,25}$/, 'Phone number must be between 10 and 25 digits and can include country code, spaces, dashes, and parentheses'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W).*$/,
      'Password must contain uppercase, lowercase, number/special character'
    )
});