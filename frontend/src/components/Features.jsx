export default function Features() {
  return (
    <section className="grid md:grid-cols-4 gap-6 px-10 pb-24">

      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-cyan-400 text-xl font-bold">
          Adaptive Questions
        </h2>

        <p className="text-gray-400 mt-3">
          Every question changes according to your answers.
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-cyan-400 text-xl font-bold">
          Follow-ups
        </h2>

        <p className="text-gray-400 mt-3">
          AI asks deeper technical questions.
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-cyan-400 text-xl font-bold">
          Context Memory
        </h2>

        <p className="text-gray-400 mt-3">
          Keeps the whole interview in memory.
        </p>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6">
        <h2 className="text-cyan-400 text-xl font-bold">
          AI Feedback
        </h2>

        <p className="text-gray-400 mt-3">
          Detailed report with strengths and improvements.
        </p>
      </div>

    </section>
  );
}