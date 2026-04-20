import { createContext, useState, useContext } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAutenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
      setUser(res.data); // probablemente también quieras esto
      setErrors([]); // limpiamos errores anteriores
    } catch (error) {
      const err = error.response?.data?.error;
      console.log(err);
      setErrors(Array.isArray(err) ? err : [err]);
    }
  };
  return (
    <AuthContext.Provider
      value={{ signup, user, isAutenticated, errors, signin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
