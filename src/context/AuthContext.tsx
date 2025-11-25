import { createContext, useContext } from "react";

type User = {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  profilePic: string;
} | null;

interface AuthContextType {
  authUser: User;
  setAuthUser: React.Dispatch<React.SetStateAction<User>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};
