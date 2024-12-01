import { RegisterDto } from '@/types';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { RegisterSchema } from '@/validations/RegisterValidation';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RegisterForm: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const initialValues: RegisterDto = {
    username: '',
    phone: '',
    email: '',
    password: ''
  };

  const handleSubmit = async ( values: RegisterDto ) => {
    try {
      await register(values);
      toast.success("Registered successfully!");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Failed to register. Please check the data.", error);
      const errorMessage = error.response?.data?.message?.message || "Failed to register. Please try again.";
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
            Create Your Account
          </CardTitle>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
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
                    <AlertTitle>Registration Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Username Input */}
                <div>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.username && errors.username 
                        ? 'border-red-500' 
                        : ''
                    }`}
                  />
                  {touched.username && errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Phone Input */}
                <div>
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full ${
                      touched.phone && errors.phone 
                        ? 'border-red-500' 
                        : ''
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

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
                      touched.email && errors.email 
                        ? 'border-red-500' 
                        : ''
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
                      touched.password && errors.password 
                        ? 'border-red-500' 
                        : ''
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
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    'Register'
                  )}
                </Button>
              </form>
            )}
          </Formik>

          <div className="mt-4 text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </Link>
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;