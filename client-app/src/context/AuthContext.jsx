import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(true);

  const login = ({ token, role }) => {
    if (token && role) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setRole(role);
    }
  };
  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole("user");
  };

  const value = {
    isAuthenticated,
    role,
    login,
    logout,
    isLoading,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setRole("user");
    }
    setIsLoading(false);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
const RequireAuth = ({ children }) => {
  const { isAuthenticated, role, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/Login");
    }
  }, [isAuthenticated]);

  return children;
};

const RequireAdmin = ({ children }) => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated && role !== "admin") {
    navigate("/User");
  }

  return children;
};

export default AuthProvider;
export { useAuth, RequireAuth, RequireAdmin };
