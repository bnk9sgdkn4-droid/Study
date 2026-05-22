interface Props {
  message?: string;
  color?: string;
}

export default function LoadingSpinner({ message = 'Generating...', color = '#6366F1' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative w-14 h-14">
        <div
          className="absolute inset-0 rounded-full border-4 border-slate-700"
        />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
          style={{ borderTopColor: color }}
        />
        <div className="absolute inset-2 rounded-full flex items-center justify-center text-lg">
          🤖
        </div>
      </div>
      <div className="text-center">
        <p className="text-slate-200 font-semibold">{message}</p>
        <p className="text-slate-500 text-sm mt-1">AI is analyzing your materials…</p>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
