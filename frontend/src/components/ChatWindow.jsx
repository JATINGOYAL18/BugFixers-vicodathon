export default function ChatWindow({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "ai"
              ? "justify-start"
              : "justify-end"
          }`}
        >
          <div
            className={`max-w-xl rounded-2xl px-5 py-4 ${
              message.role === "ai"
                ? "bg-cyan-500 text-white"
                : "bg-slate-700 text-white"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}