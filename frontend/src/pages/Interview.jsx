import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";

import {
  startInterview,
  sendAnswer,
  getFeedback,
} from "../services/api";

const candidate = {
  id: "CAND-001",
  name: "Sarah Johnson",
  jobRole: "Senior Data Engineer",
  yearsExperience: 9,
  education: "MS Computer Science",
  completed_topics: [
    "Embeddings Explained",
    "Vector Databases Overview",
    "Retrieval & Matching Engine",
    "Prompt Engineering Fundamentals",
  ],
};

const TOTAL_QUESTIONS = 8;

export default function Interview() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [questionNumber, setQuestionNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function beginInterview() {
      try {
        setLoading(true);
        setError("");

        const response = await startInterview(
          sessionId,
          candidate
        );

        if (cancelled) return;

        setMessages([
          {
            role: "ai",
            text: response.reply,
          },
        ]);
      } catch (err) {
        console.error("Start interview error:", err);

        if (!cancelled) {
          setError(
            "Unable to connect to interview server. Please make sure the backend is running."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    beginInterview();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  async function handleSendAnswer(answer) {
    if (sending || !answer.trim()) {
      return;
    }

    try {
      setSending(true);
      setError("");

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "user",
          text: answer,
        },
      ]);

      const response = await sendAnswer(
        sessionId,
        answer
      );

      if (
        response.done === true ||
        questionNumber >= TOTAL_QUESTIONS
      ) {
        const feedbackResponse =
          await getFeedback(sessionId);

        navigate("/result", {
          state: {
            feedback: feedbackResponse.feedback,
          },
        });

        return;
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "ai",
          text: response.reply,
        },
      ]);

      setQuestionNumber(
        (previousNumber) => previousNumber + 1
      );
    } catch (err) {
      console.error("Send answer error:", err);

      setError(
        "Unable to send your answer. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">
            🤖
          </div>

          <h2 className="text-2xl font-semibold">
            Starting your AI interview...
          </h2>

          <p className="text-slate-400 mt-2">
            Preparing your first question
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto py-10 px-6">

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            🤖 AI Interview
          </h1>

          <p className="text-slate-400 mt-2">
            {candidate.name} • {candidate.jobRole}
          </p>
        </div>

        <ProgressBar
          current={questionNumber}
          total={TOTAL_QUESTIONS}
        />

        {error && (
          <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4">
            {error}
          </div>
        )}

        <div className="mt-8">
          <ChatWindow messages={messages} />
        </div>

        <div className="mt-6">
          <ChatInput
            onSend={handleSendAnswer}
            disabled={sending}
          />
        </div>

        {sending && (
          <p className="text-center text-slate-400 mt-4">
            🤖 AI is thinking...
          </p>
        )}
      </div>
    </div>
  );
}