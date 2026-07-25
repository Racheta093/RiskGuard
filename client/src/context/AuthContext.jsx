import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as authService from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await authService.getMe();
        setUser(res.user);
      } catch (err) {
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login(email, password);
    setUser(res.user);
    return res.user;
  };

  const register = async (name, email, password) => {
    const res = await authService.register(name, email, password);
    setUser(res.user);
    return res.user;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      toast.success("Logged out.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, checkingSession, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
