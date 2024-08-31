import { AuthContextType } from "@/types";
import React, {
  createContext,
  useState,
} from "react";


export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setisAuthenticated] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{ setisAuthenticated, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
