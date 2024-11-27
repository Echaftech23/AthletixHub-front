import React from "react";
import AppRouter from "./router";
import { AuthProvider } from "./contexts/auth/AuthProvider";

const App: React.FC = () => (
  <AuthProvider>
    <AppRouter />
  </AuthProvider>
);

export default App;
