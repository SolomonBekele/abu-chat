import React, { useState } from "react";
import { AuthContext } from "./authContext";

type User = {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  profilePic: string;
} | null;

interface ProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
