import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const LoginForm = lazy(() => import("@/components/auth/LoginForm"));
const RegisterForm = lazy(() => import("@/components/auth/RegisterForm"));
const AuthGuard = lazy(() => import("@/guards/AuthGuard"));
const DashboardPage = lazy(() => import("@/pages/organiser"));
const Events = lazy(() => import("@/pages/organiser/events"));

const AppRouter = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        //Protected routes
        <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>}/>
        <Route path="/events" element={<AuthGuard><Events /></AuthGuard>}/>
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;