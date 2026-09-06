import {
  getInterviewById,
  evaluateAnswer,
  completeInterview,
  deleteInterview,
} from "../../services/interview.service";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Send,
  Clock,
  AlertTriangle,
  Trophy,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Button from "../../components/ui/Button";
import Loader from "../../components/ui/Loader";

const Interview = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [evaluating, setEvaluating] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const pendingNavRef = useRef(null);

  const interviewId = sessionStorage.getItem("interviewId");

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Warn before browser close/refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (interview && interview.status !== "Completed") {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [interview]);

  // Handle exit confirmation
  const handleExitInterview = useCallback(async () => {
    if (interviewId && interview?.status !== "Completed") {
      try {
        await deleteInterview(interviewId);
      } catch {
        // Cleanup failed silently — not critical
      }
    }
    sessionStorage.removeItem("interviewId");
    setShowExitConfirm(false);
    navigate("/dashboard", { replace: true });
  }, [interviewId, interview, navigate]);

  // Intercept navigation away
  const requestExit = () => {
    if (interview?.status === "Completed") {
      navigate("/dashboard");
      return;
    }
    setShowExitConfirm(true);
  };

  useEffect(() => {
    const fetchInterview = async () => {
      if (!interviewId) {
        toast.error("Interview not found.");
        navigate("/dashboard");
        return;
      }

      try {
        const response = await getInterviewById(interviewId);
        setInterview(response.data);

        const loadedAnswers = {};
        const loadedEvaluations = {};

        response.data.questions.forEach((question) => {
          loadedAnswers[question._id] = question.answer || "";

          if (question.feedback) {
            loadedEvaluations[question._id] = {
              score: question.score,
              feedback: question.feedback,
              idealAnswer: question.idealAnswer,
            };
          }
        });

        setAnswers(loadedAnswers);
        setEvaluations(loadedEvaluations);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
          "Failed to load interview."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  const handleEvaluate = async () => {
    const currentAnswer =
      answers[currentQuestion._id] || "";

    if (!currentAnswer.trim()) {
      toast.error("Please write your answer first.");
      return;
    }

    try {
      setEvaluating(true);

      const response = await evaluateAnswer({
        interviewId,
        questionId: currentQuestion._id,
        answer: currentAnswer,
      });

      setEvaluations((prev) => ({
        ...prev,
        [currentQuestion._id]: response.data,
      }));

      toast.success(response.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to evaluate answer."
      );
    } finally {
      setEvaluating(false);
    }
  };

  const handleCompleteInterview = async () => {
    try {
      setCompleting(true);

      const response = await completeInterview(interviewId);

      toast.success(response.message);

      navigate("/result", {
        state: response.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to complete interview."
      );
    } finally {
      setCompleting(false);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        if (currentEvaluation) return;
        handleEvaluate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (loading) {
    return <Loader fullScreen text="Loading Interview..." />;
  }

  if (!interview) {
    return null;
  }

  const currentQuestion = interview.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion._id] || "";
  const currentEvaluation = evaluations[currentQuestion._id] || null;

  const evaluatedCount = Object.keys(evaluations).length;
  const totalQuestions = interview.questions.length;
  const allEvaluated = evaluatedCount === totalQuestions;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const getScoreBadgeColor = (score) => {
    if (score >= 8) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    if (score >= 6) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    if (score >= 4) return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    return "bg-red-500/15 text-red-400 border-red-500/30";
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-8">

        {/* ── Header ── */}
        <div className="animate-fade-in flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <button
                onClick={requestExit}
                className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                aria-label="Exit interview"
              >
                <ChevronLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                {interview.role}
              </h1>
            </div>
            <div className="mt-1 ml-10 flex items-center gap-3 text-sm text-zinc-400">
              <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-medium">
                {interview.difficulty}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {formatTime(elapsedSeconds)}
              </span>
            </div>
          </div>

          <div className="text-sm text-zinc-400">
            <span className="text-blue-400 font-semibold">{evaluatedCount}</span>
            <span> / {totalQuestions} answered</span>
          </div>
        </div>

        {/* ── Question Stepper ── */}
        <div className="animate-fade-in-up delay-100 mt-6 flex items-center gap-2 overflow-x-auto pb-2">
          {interview.questions.map((q, i) => {
            const isEvaluated = !!evaluations[q._id];
            const isCurrent = i === currentQuestionIndex;

            return (
              <button
                key={q._id}
                onClick={() => setCurrentQuestionIndex(i)}
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200
                  ${isCurrent
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-110"
                    : isEvaluated
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-zinc-800/60 text-zinc-500 border border-zinc-700/40 hover:border-zinc-600 hover:text-zinc-300"
                  }
                `}
              >
                {isEvaluated && !isCurrent ? (
                  <CheckCircle2 size={16} />
                ) : (
                  i + 1
                )}
              </button>
            );
          })}
        </div>

        {/* ── Progress Bar ── */}
        <div className="mt-4">
          <div className="h-1.5 w-full rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 ease-out"
              style={{
                width: `${(evaluatedCount / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* ── Question & Answer ── */}
        <div className="animate-fade-in-up delay-200 mt-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-white leading-relaxed">
              {currentQuestion.question}
            </h2>
            <span className="shrink-0 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-400">
              Q{currentQuestionIndex + 1}
            </span>
          </div>

          <textarea
            value={currentAnswer}
            onChange={(e) => {
              setAnswers((prev) => ({
                ...prev,
                [currentQuestion._id]: e.target.value,
              }));
            }}
            disabled={!!currentEvaluation}
            placeholder={
              currentEvaluation
                ? "Answer submitted"
                : "Write your answer here... (Ctrl+Enter to submit)"
            }
            className="mt-6 h-48 w-full rounded-xl border border-zinc-700/50 bg-zinc-950/60 p-4 text-white outline-none transition-all focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 resize-none placeholder:text-zinc-600 disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* ── AI Feedback ── */}
        {currentEvaluation && (
          <div className="animate-scale-in mt-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-blue-400" />
                AI Feedback
              </h2>
              <span
                className={`rounded-full border px-4 py-1.5 text-sm font-bold ${getScoreBadgeColor(
                  currentEvaluation.score
                )}`}
              >
                {currentEvaluation.score} / 10
              </span>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                  Ideal Answer
                </p>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 rounded-xl bg-zinc-950/40 p-4 border border-zinc-800/40">
                  <ReactMarkdown>{currentEvaluation.idealAnswer}</ReactMarkdown>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Feedback
                </p>
                <div className="prose prose-invert prose-sm max-w-none text-zinc-300 rounded-xl bg-zinc-950/40 p-4 border border-zinc-800/40">
                  <ReactMarkdown>{currentEvaluation.feedback}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Navigation Buttons ── */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="secondary"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
          >
            <ChevronLeft size={18} />
            Previous
          </Button>

          {!currentEvaluation && (
            <Button
              loading={evaluating}
              onClick={handleEvaluate}
            >
              <Send size={16} />
              Submit Answer
            </Button>
          )}

          {isLastQuestion ? (
            allEvaluated && (
              <Button
                variant="success"
                loading={completing}
                onClick={handleCompleteInterview}
              >
                <Trophy size={16} />
                Complete Interview
              </Button>
            )
          ) : (
            <Button
              variant="secondary"
              disabled={!currentEvaluation}
              onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            >
              Next
              <ChevronRight size={18} />
            </Button>
          )}
        </div>

        {/* Tip for non-evaluated last question */}
        {isLastQuestion && !allEvaluated && currentEvaluation && (
          <p className="mt-4 text-center text-sm text-zinc-500">
            Answer all questions to complete the interview.{" "}
            <span className="text-blue-400">{totalQuestions - evaluatedCount}</span> remaining.
          </p>
        )}
      </main>

      {/* ── Exit Confirmation Modal ── */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">
          <div className="animate-scale-in w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">
              Leave Interview?
            </h3>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              Your progress will not be saved. This interview will be discarded and won't count towards your stats.
            </p>
            <div className="mt-8 flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowExitConfirm(false)}
                className="flex-1"
              >
                Continue Interview
              </Button>
              <Button
                variant="danger"
                onClick={handleExitInterview}
                className="flex-1"
              >
                Leave & Discard
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;
