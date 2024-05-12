"use client";

import { UserContextProvider } from "./context/UserContext";
import AuthProvider from "./context/authProvider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </AuthProvider>
  );
};

export default Providers;
