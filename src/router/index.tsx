import Loader from "@/components/ui/loader";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const AuthGuard = lazy(() => import("@/guards/AuthGuard"));
const DashboardPage = lazy(() => import("@/pages/organiser"));
const Events = lazy(() => import("@/pages/organiser/events"));
const Participants = lazy(() => import("@/pages/organiser/participants"));
const EventDetails = lazy(() => import("@/pages/organiser/events/details"));

const AppRouter = () => (
  <Router>
    <Suspense fallback={
      <div className='h-screen flex items-center justify-center'>
        <Loader />
      </div>
    }>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        //Protected routes
        <Route path="/dashboard" element={<AuthGuard><DashboardPage /></AuthGuard>}/>
        <Route path="/events" element={<AuthGuard><Events /></AuthGuard>}/>
        <Route path="/events/:eventId" element={<AuthGuard><EventDetails /></AuthGuard>} />
        <Route path="/participants" element={<AuthGuard><Participants /></AuthGuard>}/>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;