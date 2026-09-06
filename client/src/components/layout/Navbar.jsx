import {
  LogOut,
  LayoutDashboard,
  Mic,
  History,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume/upload", label: "New Interview", icon: Mic },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: User },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-zinc-800/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-0 h-16">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2.5 text-lg font-bold text-white transition hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold shadow-lg shadow-blue-500/20">
            AI
          </div>
          <span className="hidden sm:inline"> 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐂𝐨𝐚𝐜𝐡   </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`
                flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
                ${
                  isActive(to)
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* User Avatar */}
          <div className="hidden items-center gap-2.5 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xs font-bold text-white">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="max-w-[120px] truncate text-sm text-zinc-300">
              {user?.fullName}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-800/60 px-3 py-2 text-sm text-zinc-300 transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">
              {loggingOut ? "..." : "Logout"}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="animate-fade-in border-t border-zinc-800/60 px-4 pb-4 pt-2 md:hidden">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all
                ${
                  isActive(to)
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;