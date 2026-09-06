import React, { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Loader from "../../components/ui/Loader";
import useAuth from "../../hooks/useAuth";
import { 
  Calendar, 
  Trophy, 
  Star, 
  Zap, 
  Award, 
  Quote,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Target
} from "lucide-react";

const quotes = [
  "Every interview is a lesson. Every rejection is a redirection. Keep improving until success has no choice but to find you.",
  "One interview can change your life forever. Never let one bad day convince you to stop chasing the career you deserve.",
  "The person who keeps learning while others quit will always have opportunities waiting ahead.",
  "Your current situation is temporary. The skills you build today will open doors that seem impossible right now.",
  "Believe in consistent effort more than instant results. Success belongs to those who continue after everyone else has given up."
];

const getRank = (count) => {
  const num = count || 0;
  if (num >= 50) return { name: "Interview Master", icon: <Trophy size={24} className="text-yellow-400" />, color: "from-yellow-400 to-amber-600", nextAt: 100 };
  if (num >= 20) return { name: "Seasoned Pro", icon: <Star size={24} className="text-purple-400" />, color: "from-purple-400 to-indigo-600", nextAt: 50 };
  if (num >= 5) return { name: "Rising Star", icon: <Zap size={24} className="text-blue-400" />, color: "from-blue-400 to-cyan-600", nextAt: 20 };
  return { name: "Ambitious Novice", icon: <Award size={24} className="text-zinc-400" />, color: "from-zinc-400 to-zinc-600", nextAt: 5 };
};

const Profile = () => {
  const { user, loading } = useAuth();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [isQuoteAnimating, setIsQuoteAnimating] = useState(false);

  // Auto-play quotes
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextQuote();
    }, 8000);
    return () => clearInterval(timer);
  }, [quoteIndex]);

  const handleNextQuote = () => {
    setIsQuoteAnimating(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsQuoteAnimating(false);
    }, 300);
  };

  const handlePrevQuote = () => {
    setIsQuoteAnimating(true);
    setTimeout(() => {
      setQuoteIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
      setIsQuoteAnimating(false);
    }, 300);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <Loader fullScreen text="Loading Profile..." />
      </div>
    );
  }

  const rank = getRank(user.completedInterviews);
  const completed = user.completedInterviews || 0;
  const progressPercent = Math.min(100, Math.round((completed / rank.nextAt) * 100));

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid relative overflow-hidden">
      <Navbar />

      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="mx-auto max-w-5xl px-6 py-12 relative z-10">
        <div className="animate-fade-in-up rounded-3xl border border-zinc-800/60 glass-strong p-8 sm:p-12 shadow-2xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="group relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 opacity-70 blur-md transition duration-500 group-hover:opacity-100 group-hover:blur-lg animate-pulse-glow" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-800 text-6xl font-bold text-white shadow-xl border-2 border-zinc-700/50 transition-transform duration-300 group-hover:scale-105">
                <span className="gradient-text">{user.fullName.charAt(0).toUpperCase()}</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left mt-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {user.fullName}
              </h1>
              <p className="mt-2 text-lg text-zinc-400 font-medium flex items-center justify-center md:justify-start gap-2">
                {user.email}
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${rank.color} bg-opacity-10 border border-white/10 text-white shadow-sm`}>
                  {rank.icon}
                  {rank.name}
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-zinc-800/80 border border-zinc-700/50 text-zinc-300">
                  <Calendar size={16} className="text-zinc-400" />
                  Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Tabs */}
          <div className="mt-12 flex border-b border-zinc-800/60">
            {["overview", "achievements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 relative ${
                  activeTab === tab ? "text-blue-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-t-full animate-scale-in" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-8 min-h-[300px]">
            {activeTab === "overview" && (
              <div className="animate-fade-in grid gap-6 md:grid-cols-2">
                
                {/* Stats Card */}
                <div className="group rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-zinc-900/60 hover:shadow-glow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Target size={100} />
                  </div>
                  <p className="text-sm uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
                    <TrendingUp size={16} className="text-blue-400" />
                    Interviews Completed
                  </p>
                  <div className="mt-4 flex items-baseline gap-3">
                    <h2 className="text-5xl font-bold text-white tracking-tighter">
                      {completed}
                    </h2>
                    <span className="text-zinc-500 font-medium">sessions</span>
                  </div>
                  
                  {/* Progress to next rank */}
                  <div className="mt-8">
                    <div className="flex justify-between text-xs text-zinc-400 font-medium mb-2 uppercase tracking-wide">
                      <span>Progress to {getRank(rank.nextAt).name}</span>
                      <span>{completed} / {rank.nextAt}</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${rank.color} transition-all duration-1000 ease-out`} 
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Motivation Carousel */}
                <div className="group rounded-2xl border border-zinc-800/50 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-cyan-500/30 hover:bg-zinc-900/60 hover:shadow-glow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <p className="text-sm uppercase tracking-wider text-zinc-400 font-semibold flex items-center gap-2">
                        <Quote size={16} className="text-cyan-400" />
                        Daily Motivation
                      </p>
                    </div>
                    <div className={`transition-opacity duration-300 ${isQuoteAnimating ? 'opacity-0' : 'opacity-100'}`}>
                      <p className="text-lg text-zinc-200 leading-relaxed font-medium italic">
                        "{quotes[quoteIndex]}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <div className="flex gap-2">
                      {quotes.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 rounded-full transition-all duration-500 ${idx === quoteIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-zinc-700'}`}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handlePrevQuote} className="p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={handleNextQuote} className="p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === "achievements" && (
              <div className="animate-fade-in flex flex-col items-center justify-center text-center p-12 border border-zinc-800/40 rounded-2xl bg-zinc-900/20 border-dashed">
                <Trophy size={48} className="text-zinc-600 mb-4" />
                <h3 className="text-xl font-bold text-zinc-300">More Achievements Coming Soon</h3>
                <p className="mt-2 text-zinc-500 max-w-md">
                  Keep completing interviews to unlock special badges, streaks, and performance metrics. We are building something exciting!
                </p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;