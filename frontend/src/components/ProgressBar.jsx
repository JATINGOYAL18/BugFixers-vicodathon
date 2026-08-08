export default function ProgressBar({ current, total }) {
  const percent = Math.min(
    Math.max((current / total) * 100, 0),
    100
  );

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
        <span>
          Question {current} / {total}
        </span>

        <span>{Math.round(percent)}%</span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-3 rounded-full bg-cyan-400 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}