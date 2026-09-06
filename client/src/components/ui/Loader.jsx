const Loader = ({ fullScreen = false, text = "", variant = "spinner" }) => {

  const spinner = (
    <div className="relative">
      <div className="h-12 w-12 rounded-full border-[3px] border-zinc-800"></div>
      <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-[3px] border-transparent border-t-blue-500"></div>
    </div>
  );

  const dots = (
    <div className="dot-pulse">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

  const loaderElement = variant === "dots" ? dots : spinner;

  if (fullScreen) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-zinc-950">
        <div className="animate-scale-in">
          {loaderElement}
        </div>
        {text && (
          <p className="animate-fade-in text-sm font-medium tracking-wide text-zinc-400">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="animate-scale-in">
        {loaderElement}
      </div>
      {text && (
        <p className="animate-fade-in text-sm font-medium tracking-wide text-zinc-400">
          {text}
        </p>
      )}
    </div>
  );
};

// Skeleton component for loading states
export const Skeleton = ({ className = "", lines = 1 }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4 rounded-md"
          style={{
            width: i === lines - 1 && lines > 1 ? "60%" : "100%",
          }}
        />
      ))}
    </div>
  );
};

// Skeleton card for dashboard loading
export const SkeletonCard = ({ className = "" }) => {
  return (
    <div className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 ${className}`}>
      <div className="skeleton mb-4 h-4 w-24 rounded-md" />
      <div className="skeleton h-8 w-16 rounded-md" />
    </div>
  );
};

export default Loader;