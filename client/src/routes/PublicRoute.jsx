import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { loading, isAuthenticated } = useAuth();
    console.log({
        loading,
        isAuthenticated,
    });
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;