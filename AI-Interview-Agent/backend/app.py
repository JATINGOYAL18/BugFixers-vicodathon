from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    InterviewRequest,
    AnswerRequest,
    FeedbackRequest,
)

from services.interview import (
    start_interview,
    process_answer,
    generate_feedback,
)

from memory.session_memory import create_session


# -----------------------------------
# FastAPI App
# -----------------------------------

app = FastAPI()


# -----------------------------------
# CORS Configuration
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------
# Start Interview
# -----------------------------------

@app.post("/api/interview")
def interview(request: InterviewRequest):

    create_session(
        request.sessionId,
        request.candidate,
    )

    question = start_interview(
        request.candidate,
        request.sessionId,
    )

    return {
        "reply": question,
        "done": False,
    }


# -----------------------------------
# Process Candidate Answer
# -----------------------------------

@app.post("/api/answer")
def answer(request: AnswerRequest):

    next_question = process_answer(
        request.sessionId,
        request.answer,
    )

    return {
        "reply": next_question,
        "done": False,
    }


# -----------------------------------
# Generate Feedback
# -----------------------------------

@app.post("/api/feedback")
def feedback(request: FeedbackRequest):

    result = generate_feedback(
        request.sessionId,
    )

    return {
        "feedback": result,
        "done": True,
    }