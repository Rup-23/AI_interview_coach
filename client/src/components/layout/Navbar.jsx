import { LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await logout();
      toast.success("Logged out successfully.");
    } catch {
      // Logout clears state regardless — just suppress error
    } finally {
      setLoggingOut(false);
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:py-0">

        <Link
          to="/dashboard"
          className="text-xl font-bold text-white"
        >
          AI Interview Coach
        </Link>

        <div className="flex items-center justify-between gap-3 sm:justify-end">

          <p className="truncate text-sm text-zinc-300">
            {user?.fullName}
          </p>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">
              {loggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;