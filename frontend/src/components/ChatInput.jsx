import { useState } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    const trimmedAnswer = answer.trim();

    if (!trimmedAnswer || disabled) {
      return;
    }

    onSend(trimmedAnswer);
    setAnswer("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <textarea
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={
          disabled
            ? "Waiting for AI..."
            : "Type your answer here..."
        }
        disabled={disabled}
        className="flex-1 h-28 resize-none rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none focus:border-cyan-400 disabled:opacity-50"
      />

      <button
        onClick={handleSubmit}
        disabled={disabled || !answer.trim()}
        className="rounded-xl bg-cyan-500 px-8 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}