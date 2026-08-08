export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6">

      <h1 className="text-2xl font-bold text-cyan-400">
        AI Interview Agent
      </h1>

      <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold">
        Start Interview
      </button>

    </nav>
  );
}