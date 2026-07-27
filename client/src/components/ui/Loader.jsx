const Loader = ({ fullScreen = false, text = "" }) => {
  if (fullScreen) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
        {text && (
          <p className="text-sm font-medium text-zinc-400">{text}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-500"></div>
      {text && (
        <p className="text-sm font-medium text-zinc-400">{text}</p>
      )}
    </div>
  );
};

export default Loader;