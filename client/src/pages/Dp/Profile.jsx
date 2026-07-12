import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/layout/Navbar";
import { getCurrentUser } from "../../services/auth.service";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

//   const handleLogout = async () => {
//     try {
//       await logoutUser();

//       toast.success("Logged out successfully.");

//       navigate("/login");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Logout failed."
//       );
//     }
//   };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-xl font-semibold text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-12">

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">

          {/* Avatar */}

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-5xl font-bold text-white shadow-lg">

              {user.fullName.charAt(0).toUpperCase()}

            </div>

            <h1 className="mt-6 text-4xl font-bold text-white">
              {user.fullName}
            </h1>

            <p className="mt-2 text-lg text-zinc-400">
              {user.email}
            </p>

          </div>

          {/* Information Cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-blue-500">

              <p className="text-sm uppercase tracking-wider text-zinc-500">
                Member Since
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                {new Date(user.createdAt).toLocaleDateString()}
              </h2>

            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-blue-500">

              <p className="text-sm uppercase tracking-wider text-zinc-500">
                Interviews Completed
              </p>

              <h2 className="mt-3 text-3xl font-bold text-blue-500">
                {user.completedInterviews || "Not available"}
              </h2>

            </div>

          </div>

          {/* Motivation */}

          <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-8">

            <h2 className="text-2xl font-bold text-white">
              Keep Moving Forward
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-8 text-zinc-200">

              <p>
                "Every interview is a lesson. Every rejection is a redirection.
                Keep improving until success has no choice but to find you."
              </p>

              <p>
                "One interview can change your life forever. Never let one bad
                day convince you to stop chasing the career you deserve."
              </p>

              <p>
                "The person who keeps learning while others quit will always
                have opportunities waiting ahead."
              </p>

              <p>
                "Your current situation is temporary. The skills you build
                today will open doors that seem impossible right now."
              </p>

              <p>
                "Believe in consistent effort more than instant results.
                Success belongs to those who continue after everyone else has
                given up."
              </p>

            </div>

          </div>

          {/* Logout */}

          {/* <button
            onClick={handleLogout}
            className="mt-12 w-full rounded-2xl bg-red-600 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-700"
          >
            Logout
          </button> */}

        </div>

      </main>

    </div>
  );
};

export default Profile;