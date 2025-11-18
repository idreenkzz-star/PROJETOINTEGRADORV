import { createContext, useContext, useState } from "react";

type AuthContextType = {
  logged: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  logged: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [logged, setLogged] = useState(false);

  const login = () => setLogged(true);
  const logout = () => setLogged(false);

  return (
    <AuthContext.Provider value={{ logged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
