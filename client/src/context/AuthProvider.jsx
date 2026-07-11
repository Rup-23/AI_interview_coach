import { useEffect, useState } from "react";
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
        console.error("Error fetching current user:", error);
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

  const logout = async () => {
    await logoutUser();

    setUser(null);

    setIsAuthenticated(false);
  };

  useEffect(() => {
    (async () => {
      await fetchCurrentUser();
    })();
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