import React, { createContext, useState } from "react";
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ setisAuthenticated, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
