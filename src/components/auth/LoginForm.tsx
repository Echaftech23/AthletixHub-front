import { LoginDto } from '@/types';
import React, { useState } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { LoginSchema } from '@/validations/LoginValidation';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import {  useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const initialValues: LoginDto = {
    email: '',
    password: ''
  };

  const handleSubmit = async (
    values: LoginDto, 
    { setSubmitting }: FormikHelpers<LoginDto>
  ) => {
    try {
      await login(values);
      setSuccess("Login successfully!");

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Failed to login. Please check the data.", error);
      const errorMessage = error.response?.data?.message?.message[0] || "An error occurred";
      setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md bg-white text-black">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in to your account
          </CardTitle>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details
          </p>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Login Error</AlertTitle>
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

                {/* Email Input */}
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.email && errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.password && errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;