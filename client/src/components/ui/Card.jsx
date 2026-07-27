const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-md text-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;