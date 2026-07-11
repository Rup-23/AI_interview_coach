import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <h1 className="text-xl font-bold text-white">
          AI Interview Coach
        </h1>

        <div className="flex items-center gap-6">

          <p className="text-sm text-zinc-300">
            {user?.fullName}
          </p>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;