import { createContext, useContext, useState } from "react";

type AuthType = "admin" | "client" | null;

interface AuthContextProps {
  userType: AuthType;
  loginAsAdmin: () => void;
  loginAsClient: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  userType: null,
  loginAsAdmin: () => {},
  loginAsClient: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<AuthType>(null);

  function loginAsAdmin() {
    setUserType("admin");
  }

  function loginAsClient() {
    setUserType("client");
  }

  function logout() {
    setUserType(null);
  }

  return (
    <AuthContext.Provider
      value={{ userType, loginAsAdmin, loginAsClient, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
