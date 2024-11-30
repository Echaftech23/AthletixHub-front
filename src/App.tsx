import React from "react";
import AppRouter from "./router";
import { Toaster } from 'sonner';
import { AuthProvider } from "./contexts/auth/AuthProvider";

const App: React.FC = () => (
  <AuthProvider>
    <AppRouter />
    <Toaster position="bottom-right" richColors />
  </AuthProvider>
);

export default App;
