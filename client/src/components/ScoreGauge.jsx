import React from "react";

const ScoreGauge = ({ score }) => {
  const radius = 70;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const dashOffset = circumference - progress;

  const getColor = () => {
    if (score >= 80) return { stroke: "#22c55e", text: "text-emerald-400", label: "Excellent" };
    if (score >= 60) return { stroke: "#f59e0b", text: "text-amber-400", label: "Good" };
    if (score >= 40) return { stroke: "#f97316", text: "text-orange-400", label: "Fair" };
    return { stroke: "#ef4444", text: "text-red-400", label: "Needs Work" };
  };

  const color = getColor();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="160" height="160" className="-rotate-90">
          {/* Background circle */}
          <circle cx="80" cy="80" r={radius} fill="none" stroke="#27272a" strokeWidth={stroke} />
          {/* Progress circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: `drop-shadow(0 0 8px ${color.stroke}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold ${color.text}`}>{score}</span>
          <span className="text-sm text-zinc-500">/100</span>
        </div>
      </div>
      <span className={`mt-3 text-sm font-semibold ${color.text}`}>{color.label}</span>
    </div>
  );
};

export default ScoreGauge;
