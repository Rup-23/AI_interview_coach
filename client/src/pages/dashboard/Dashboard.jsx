import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FileText,
  Mic,
  History,
  User,
  Trophy,
  TrendingUp,
  Award,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import useAuth from "../../hooks/useAuth";
import { getDashboardStats } from "../../services/dashboard.service";
import { SkeletonCard } from "../../components/ui/Loader";

const statConfig = [
  {
    key: "totalCompleted",
    label: "Interviews Completed",
    icon: Target,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    key: "averageScore",
    label: "Average Score",
    icon: TrendingUp,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    suffix: "/100",
  },
  {
    key: "highestScore",
    label: "Highest Score",
    icon: Trophy,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    suffix: "/100",
  },
];

const quickActions = [
  {
    label: "Upload Resume",
    description: "Upload your latest resume for AI analysis",
    icon: FileText,
    path: "/resume/upload",
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    label: "Start Interview",
    description: "Practice with AI-generated questions",
    icon: Mic,
    path: null, // handled specially
    gradient: "from-violet-500 to-blue-500",
  },
  {
    label: "View History",
    description: "Review past interviews and feedback",
    icon: History,
    path: "/history",
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    label: "Profile",
    description: "Manage your account and stats",
    icon: User,
    path: "/profile",
    gradient: "from-amber-500 to-orange-400",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        // Silently fail — dashboard still usable without stats
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleStartInterview = () => {
    const resumeId = sessionStorage.getItem("resumeId");
    if (resumeId) {
      navigate("/interview/generate");
    } else {
      toast("Upload a resume first.", { icon: "📄" });
      navigate("/resume/upload");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* ── Welcome Section ── */}
        <div className="animate-fade-in mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Welcome back,{" "}
              <span className="gradient-text">{user?.fullName}</span>
            </h1>
            <Sparkles size={24} className="text-blue-400 animate-float" />
          </div>
          <p className="text-zinc-400">
            Ready to ace your next interview? Track your progress and keep improving.
          </p>
        </div>

        {/* ── Stats Cards ── */}
        <div className="animate-fade-in-up delay-100 mb-10 grid gap-5 sm:grid-cols-3">
          {statsLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            statConfig.map(({ key, label, icon: Icon, color, bg, border, suffix }) => (
              <div
                key={key}
                className={`group rounded-2xl border ${border} ${bg} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-400">{label}</p>
                  <div className={`rounded-lg ${bg} p-2 ${color}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <p className={`mt-3 text-4xl font-bold ${color}`}>
                  {stats?.[key] ?? 0}
                  {suffix && (
                    <span className="text-lg font-normal text-zinc-500">
                      {suffix}
                    </span>
                  )}
                </p>
              </div>
            ))
          )}
        </div>

        {/* ── Quick Actions ── */}
        <div className="animate-fade-in-up delay-200 mb-10">
          <h2 className="mb-5 text-xl font-semibold text-white">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map(({ label, description, icon: Icon, path, gradient }, i) => (
              <button
                key={label}
                onClick={() => {
                  if (label === "Start Interview") {
                    handleStartInterview();
                  } else {
                    navigate(path);
                  }
                }}
                className="group flex flex-col rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/20"
              >
                <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${gradient} p-3 text-white shadow-lg transition group-hover:scale-110`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{label}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {description}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-1.5 text-sm text-zinc-500 transition group-hover:text-blue-400">
                  Get started <ArrowRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Recent Interviews ── */}
        {!statsLoading && stats?.recentInterviews?.length > 0 && (
          <div className="animate-fade-in-up delay-300">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Interviews</h2>
              <button
                onClick={() => navigate("/history")}
                className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-blue-400"
              >
                View all <ArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {stats.recentInterviews.map((interview) => (
                <div
                  key={interview._id}
                  onClick={() => {
                    sessionStorage.setItem("interviewId", interview._id);
                    navigate("/result");
                  }}
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-5 py-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Award size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{interview.role}</p>
                      <p className="text-sm text-zinc-500">
                        {interview.difficulty} •{" "}
                        {new Date(interview.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-bold ${getScoreColor(interview.overallScore)}`}
                    >
                      {interview.overallScore}
                      <span className="text-sm font-normal text-zinc-500">/100</span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-zinc-600 transition group-hover:text-zinc-400 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;