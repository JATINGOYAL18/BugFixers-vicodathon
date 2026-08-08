import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const feedback = location.state?.feedback;

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎯</div>

          <h1 className="text-4xl font-bold">
            Interview Result
          </h1>

          <p className="mt-2 text-slate-400">
            Your AI interview has been completed.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-cyan-400">
            Interview Completed
          </h2>

          {feedback ? (
            <div className="whitespace-pre-wrap text-gray-300">
              {typeof feedback === "string"
                ? feedback
                : JSON.stringify(feedback, null, 2)}
            </div>
          ) : (
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="font-semibold text-white">
                  Overall Score:
                </span>{" "}
                Pending backend evaluation
              </p>

              <p>
                <span className="font-semibold text-white">
                  Questions Asked:
                </span>{" "}
                8
              </p>

              <p>
                <span className="font-semibold text-white">
                  Feedback:
                </span>{" "}
                No feedback available yet.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold transition hover:bg-cyan-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}