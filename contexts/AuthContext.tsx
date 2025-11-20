import { createContext, useContext, useState } from "react";

type UserType = "client" | "admin" | null;

type AuthContextType = {
  userType: UserType;
  loginAsAdmin: () => void;
  loginAsClient: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  userType: null,
  loginAsAdmin: () => {},
  loginAsClient: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [userType, setUserType] = useState<UserType>(null);

  const loginAsAdmin = () => setUserType("admin");
  const loginAsClient = () => setUserType("client");
  const logout = () => setUserType(null);

  return (
    <AuthContext.Provider value={{ userType, loginAsAdmin, loginAsClient, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
