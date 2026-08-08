from fastapi import FastAPI

from models.schemas import InterviewRequest, AnswerRequest, FeedbackRequest
from services.interview import (
    start_interview,
    process_answer,
    generate_feedback
)
from memory.session_memory import create_session

app = FastAPI()


@app.post("/api/interview")
def interview(request: InterviewRequest):

    create_session(request.sessionId, request.candidate)

    question = start_interview(
        request.candidate,
        request.sessionId
    )

    return {
        "reply": question,
        "done": False
    }


@app.post("/api/answer")
def answer(request: AnswerRequest):

    next_question = process_answer(
        request.sessionId,
        request.answer
    )

    return {
        "reply": next_question,
        "done": False
    }
@app.post("/api/feedback")
def feedback(request: FeedbackRequest):

    result = generate_feedback(request.sessionId)

    return {
        "feedback": result,
        "done": True
    }