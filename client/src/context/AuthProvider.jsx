import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.service";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load Current User
  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (data) => {
    const response = await loginUser(data);
    await fetchCurrentUser();
    return response;
  };

  // Register
  const register = async (data) => {
    const response = await registerUser(data);
    await fetchCurrentUser();
    return response;
  };

  // Logout
  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Even if the API call fails (e.g. expired token), clear client state
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Listen for force-logout events from the axios interceptor
  // (fired when refresh token is expired and can't be renewed)
  useEffect(() => {
    const handleForceLogout = () => {
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener("auth:logout", handleForceLogout);

    return () => {
      window.removeEventListener("auth:logout", handleForceLogout);
    };
  }, []);

  // Initial auth check on app load
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        fetchCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;