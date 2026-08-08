const API_BASE_URL = "http://127.0.0.1:8000";

export async function startInterview(sessionId, candidate) {
  const response = await fetch(`${API_BASE_URL}/api/interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      candidate,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to start interview");
  }

  return response.json();
}

export async function sendAnswer(sessionId, answer) {
  const response = await fetch(`${API_BASE_URL}/api/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send answer");
  }

  return response.json();
}

export async function getFeedback(sessionId) {
  const response = await fetch(`${API_BASE_URL}/api/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get interview feedback");
  }

  return response.json();
}