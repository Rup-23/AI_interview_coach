    import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  // Authentication check chal raha hai
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
      </div>
    );
  }

  // User login nahi hai
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User authenticated hai
  return children;
};

export default ProtectedRoute;