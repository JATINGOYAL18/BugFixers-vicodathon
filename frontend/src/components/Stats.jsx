const stats = [
  {
    number: "31",
    label: "Curriculum Days",
  },
  {
    number: "8+",
    label: "Interview Questions",
  },
  {
    number: "4+",
    label: "AI Domains",
  },
  {
    number: "100%",
    label: "AI Generated",
  },
];

export default function Stats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-10 pb-24">

      {stats.map((item) => (

        <div
          key={item.label}
          className="bg-slate-900 rounded-2xl p-8 text-center hover:scale-105 transition"
        >

          <h2 className="text-4xl font-bold text-cyan-400">

            {item.number}

          </h2>

          <p className="text-gray-400 mt-3">

            {item.label}

          </p>

        </div>

      ))}

    </section>
  );
}