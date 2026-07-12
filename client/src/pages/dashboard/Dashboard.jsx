import {
  FileText,
  Mic,
  User,
  History,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950">

      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            Welcome back,
            <span className="text-blue-500">
              {" "}
              {user?.fullName}
            </span>
          </h1>

          <p className="mt-3 text-zinc-400">
            Ready to ace your next interview? 🚀
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2">

          {/* Upload Resume */}

          <button
            onClick={() => navigate("/resume/upload")}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
          >

            <FileText
              className="mb-5 text-blue-500 transition group-hover:scale-110"
              size={38}
            />

            <h2 className="text-2xl font-semibold text-white">
              Upload Resume
            </h2>

            <p className="mt-3 text-zinc-400">
              Upload your latest resume and let AI prepare personalized interview questions.
            </p>

          </button>

          {/* Interview */}

          <button
            onClick={() =>
              toast("Upload a resume first.", {
                icon: "📄",
              })
            }
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
          >

            <Mic
              className="mb-5 text-blue-500 transition group-hover:scale-110"
              size={38}
            />

            <h2 className="text-2xl font-semibold text-white">
              Start Interview
            </h2>

            <p className="mt-3 text-zinc-400">
              Generate an AI-powered interview based on your uploaded resume.
            </p>

          </button>

          {/* History */}

          <button
            onClick={() => navigate("/history")}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <History
              className="mb-5 text-blue-500 transition group-hover:scale-110"
              size={38}
            />

            <h2 className="text-2xl font-semibold text-white">
              Interview History
            </h2>

            <p className="mt-3 text-zinc-400">
              Review previous interviews, AI feedback and overall scores.
            </p>
          </button>

          {/* Profile */}

          <button
            onClick={() => navigate("/profile")}
            className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
          >
            <User
              className="mb-5 text-blue-500 transition group-hover:scale-110"
              size={38}
            />

            <h2 className="text-2xl font-semibold text-white">
              Profile
            </h2>

            <p className="mt-3 text-zinc-400">
              Manage your account information and interview statistics.
            </p>
          </button>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;