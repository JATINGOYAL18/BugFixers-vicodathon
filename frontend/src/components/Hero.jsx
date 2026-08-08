import { Rocket, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>

      {/* Badge */}
      <div className="relative mb-6">
        <span className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-sm font-semibold">
          🚀 Enterprise AI Interview Platform
        </span>
      </div>

      {/* Heading */}
      <h1 className="relative text-6xl md:text-7xl font-extrabold leading-tight">
        Master Enterprise
        <br />
        <span className="text-cyan-400">
          AI Interviews
        </span>
      </h1>

      {/* Subtitle */}
      <p className="relative mt-8 text-gray-400 text-xl max-w-3xl">
        Practice real technical interviews based on
        <span className="text-cyan-400"> RAG</span> •
        <span className="text-cyan-400"> MCP</span> •
        <span className="text-cyan-400"> Prompt Engineering</span> •
        <span className="text-cyan-400"> Agentic AI</span>
      </p>

      {/* Buttons */}
      <div className="relative flex gap-5 mt-10">

        {/* Start Interview Button */}
        <Link
          to="/interview"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl font-semibold transition"
        >
          <Rocket size={20} />
          Start Interview
        </Link>

        {/* View Curriculum Button */}
        <button className="flex items-center gap-2 border border-cyan-400 hover:bg-cyan-400/10 px-8 py-4 rounded-xl transition">
          <BookOpen size={20} />
          View Curriculum
        </button>

      </div>

    </section>
  );
}