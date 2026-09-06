import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  RotateCcw,
  LayoutDashboard,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";
import ScoreGauge from "../../components/ScoreGauge";
import { getInterviewById } from "../../services/interview.service";

const QuestionScoreBadge = ({ score }) => {
  const getColor = () => {
    if (score >= 8) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    if (score >= 6) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    if (score >= 4) return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    return "bg-red-500/15 text-red-400 border-red-500/30";
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-sm font-bold ${getColor()}`}>
      {score}/10
    </span>
  );
};

const Result = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const interviewId = sessionStorage.getItem("interviewId");

  useEffect(() => {
    const fetchResult = async () => {
      if (!interviewId) {
        toast.error("Interview not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await getInterviewById(interviewId);
        setResult(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load interview result."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [interviewId]);

  const toggleQuestion = (id) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <Loader fullScreen text="Loading Result..." />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <Navbar />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
          <p className="text-xl font-semibold text-zinc-400">No Result Found</p>
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* ── Header ── */}
        <div className="animate-fade-in flex flex-col items-center text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            <Trophy size={14} />
            Interview Complete
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            {result.role}
          </h1>
          <p className="mt-2 text-zinc-400">
            {result.difficulty} Difficulty •{" "}
            {result.completedAt
              ? new Date(result.completedAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        {/* ── Score Gauge ── */}
        <div className="animate-fade-in-up delay-100 mt-10 flex justify-center">
          <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-8">
            <ScoreGauge score={result.overallScore} />
          </div>
        </div>

        {/* ── Strengths, Weaknesses, Recommendations ── */}
        <div className="animate-fade-in-up delay-200 mt-10 grid gap-5 md:grid-cols-3">

          {/* Strengths */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-emerald-400">
              <TrendingUp size={18} />
              <h3 className="font-semibold">Strengths</h3>
            </div>
            {result.strengths.length === 0 ? (
              <p className="text-sm text-zinc-500">No strengths identified.</p>
            ) : (
              <ul className="space-y-2">
                {result.strengths.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Weaknesses */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-red-400">
              <TrendingDown size={18} />
              <h3 className="font-semibold">Weaknesses</h3>
            </div>
            {result.weaknesses.length === 0 ? (
              <p className="text-sm text-zinc-500">No weaknesses identified.</p>
            ) : (
              <ul className="space-y-2">
                {result.weaknesses.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recommendations */}
          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
            <div className="mb-4 flex items-center gap-2 text-blue-400">
              <Lightbulb size={18} />
              <h3 className="font-semibold">Recommendations</h3>
            </div>
            {result.recommendations.length === 0 ? (
              <p className="text-sm text-zinc-500">No recommendations yet.</p>
            ) : (
              <ul className="space-y-2">
                {result.recommendations.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ── Question-wise Analysis ── */}
        <div className="animate-fade-in-up delay-300 mt-12">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Question Analysis
          </h2>

          <div className="space-y-3">
            {result.questions.map((question, index) => {
              const isExpanded = expandedQuestions[question._id];

              return (
                <div
                  key={question._id}
                  className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden transition-all"
                >
                  {/* Collapsible Header */}
                  <button
                    onClick={() => toggleQuestion(question._id)}
                    className="flex w-full items-center justify-between p-5 text-left transition hover:bg-zinc-900/60"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm font-medium text-zinc-400">
                        {index + 1}
                      </span>
                      <p className="font-medium text-white line-clamp-1">
                        {question.question}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <QuestionScoreBadge score={question.score} />
                      {isExpanded ? (
                        <ChevronUp size={18} className="text-zinc-500" />
                      ) : (
                        <ChevronDown size={18} className="text-zinc-500" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Content */}
                  {isExpanded && (
                    <div className="animate-fade-in border-t border-zinc-800/40 p-5 space-y-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
                          Your Answer
                        </p>
                        <p className="whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed rounded-xl bg-zinc-950/40 p-4 border border-zinc-800/40">
                          {question.answer || "No answer submitted."}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-2">
                          Ideal Answer
                        </p>
                        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 rounded-xl bg-emerald-500/5 p-4 border border-emerald-500/10">
                          <ReactMarkdown>{question.idealAnswer}</ReactMarkdown>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2">
                          AI Feedback
                        </p>
                        <div className="prose prose-invert prose-sm max-w-none text-zinc-300 rounded-xl bg-amber-500/5 p-4 border border-amber-500/10">
                          <ReactMarkdown>{question.feedback}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="animate-fade-in-up delay-400 mt-12 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            onClick={() => {
              sessionStorage.removeItem("interviewId");
              navigate("/resume/upload");
            }}
          >
            <RotateCcw size={16} />
            Start New Interview
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard size={16} />
            Back to Dashboard
          </Button>
        </div>

      </main>
    </div>
  );
};

export default Result;