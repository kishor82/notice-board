import { createContext, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("2342f2f1d131rf12"), 250);
  });

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
    const origin = location.state?.from?.pathname || "/dashboard";
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};