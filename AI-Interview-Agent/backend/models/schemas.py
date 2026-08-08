from pydantic import BaseModel
from typing import Optional


class InterviewRequest(BaseModel):
    sessionId: str
    candidate: Optional[dict] = None
    message: Optional[str] = None


class AnswerRequest(BaseModel):
    sessionId: str
    answer: str
class FeedbackRequest(BaseModel):
    sessionId: str