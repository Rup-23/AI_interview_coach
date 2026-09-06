import { Link } from "react-router-dom";
import {
  Sparkles,
  MessageSquareText,
  BarChart3,
  Upload,
  Brain,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description:
      "Get personalized interview questions generated from your actual resume using advanced AI analysis.",
  },
  {
    icon: MessageSquareText,
    title: "Instant Feedback",
    description:
      "Receive detailed evaluation with scores, ideal answers, and constructive feedback for every response.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track your progress with comprehensive dashboards showing scores, strengths, and areas to improve.",
  },
  {
    icon: Zap,
    title: "Role-Specific Prep",
    description:
      "Practice for any role — from Software Engineer to Product Manager. Questions adapt to your target position.",
  },
  {
    icon: Shield,
    title: "Difficulty Levels",
    description:
      "Choose Easy, Medium, or Hard. Start where you're comfortable and work your way up as you improve.",
  },
  {
    icon: Clock,
    title: "Practice Anytime",
    description:
      "No scheduling needed. Practice interviews on your own schedule, as many times as you want.",
  },
];

const steps = [
  {
    step: "01",
    title: "Upload Resume",
    description: "Upload your PDF resume. Our AI extracts your skills, projects, and experience.",
  },
  {
    step: "02",
    title: "Start Interview",
    description: "Choose your target role and difficulty. AI generates 10 personalized questions.",
  },
  {
    step: "03",
    title: "Get Results",
    description: "Receive detailed scores, feedback, strengths, weaknesses, and recommendations.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 bg-grid">

      {/* ── Navbar ── */}
      <header className="glass-strong sticky top-0 z-50 border-b border-zinc-800/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-blue-500/20">
              AI
            </div>
            <span className="text-lg font-bold text-white">Interview Coach</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pb-32 sm:pt-36">
        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div className="h-[500px] w-[800px] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>
        <div className="pointer-events-none absolute right-0 top-20">
          <div className="h-[300px] w-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-in mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            <Sparkles size={14} />
            Powered by AI
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-up text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Ace Your Next
            <br />
            <span className="gradient-text animate-gradient">
              Interview
            </span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg text-zinc-400 sm:text-xl">
            Practice with AI-generated interview questions tailored to your resume.
            Get instant feedback, track your progress, and walk into your interview
            with confidence.
          </p>

          {/* CTA */}
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              Start Practicing Free
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-8 py-4 text-lg font-semibold text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
            >
              Sign In
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-500 mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-bold text-white">10</p>
              <p className="mt-1 text-sm text-zinc-500">Questions / Interview</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">AI</p>
              <p className="mt-1 text-sm text-zinc-500">Powered Feedback</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">3</p>
              <p className="mt-1 text-sm text-zinc-500">Difficulty Levels</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">Features</p>
            <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Everything You Need to <span className="gradient-text">Prepare</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Our AI Interview Coach provides a complete interview preparation experience — from resume analysis to detailed performance reports.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className={`animate-fade-in-up delay-${(i + 1) * 100} group rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5`}
              >
                <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400 transition group-hover:bg-blue-500/20 group-hover:shadow-lg group-hover:shadow-blue-500/10">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">How It Works</p>
            <h2 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Three Simple Steps
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map(({ step, title, description }, i) => (
              <div
                key={step}
                className={`animate-fade-in-up delay-${(i + 1) * 100} relative rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-8 text-center`}
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-xl font-bold text-white shadow-lg shadow-blue-500/20">
                  {step}
                </div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="border-t border-zinc-800/60 px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Ready to <span className="gradient-text">Land Your Dream Job</span>?
          </h2>
          <p className="mt-5 text-lg text-zinc-400">
            Start practicing today. Upload your resume, answer AI-generated questions,
            and get the feedback you need to succeed.
          </p>
          <Link
            to="/register"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            Get Started — It's Free
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-800/60 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 text-[10px] font-bold text-white">
              AI
            </div>
            Interview Coach
          </div>
          <p className="text-sm text-zinc-600">
            Built with React, Node.js, MongoDB & Groq AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
