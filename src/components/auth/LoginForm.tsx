import { LoginDto } from '@/types';
import React, { useState } from 'react';
import { Formik } from 'formik';
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
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from "@/hooks/useAuth";
import {  Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const initialValues: LoginDto = {
    email: '',
    password: ''
  };

  const handleSubmit = async ( values: LoginDto ) => {
    setError(null);
    try {
      await login(values);
      toast.success("Login successfully! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("Failed to login. Please check the data.", error);
      const errorMessage = error.response?.data?.message?.message || "An error occurred";
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>
              
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
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
                      <span>Login...</span>
                    </>
                  ) : (
                    <span>Login</span>
                  )}
                </Button>
              </form>
            )}
          </Formik>

          <div className="text-center m-3">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;