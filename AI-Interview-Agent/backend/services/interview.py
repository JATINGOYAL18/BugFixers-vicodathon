from services.gemini import ask_gemini

from memory.session_memory import (
    add_message,
    get_session,
    increment_question,
    get_question_count,
    add_topic,
    get_topics
)


def start_interview(candidate, session_id):

    topics = candidate.get("completed_topics", [])

    # Start with the first completed topic
    first_topic = topics[0] if topics else "General AI"

    prompt = f"""
You are a senior AI technical interviewer.

Candidate:
{candidate}

Start the interview.

Today's interview topic:
{first_topic}

Ask ONE technical interview question about this topic.

The question should test understanding, not memorization.

Do not provide the answer.
"""

    question = ask_gemini(prompt)

    add_message(session_id, "interviewer", question)
    add_topic(session_id, first_topic)
    increment_question(session_id)

    return question


def process_answer(session_id, answer):

    session = get_session(session_id)

    if not session:
        return "Interview session not found."

    history = session["history"]

    candidate = session["candidate"]

    completed_topics = candidate.get("completed_topics", [])

    question_count = get_question_count(session_id)

    topics_covered = get_topics(session_id)

    # Save candidate's answer first
    add_message(session_id, "candidate", answer)

    # Decide which topic to use
    if question_count < 2 and completed_topics:
        current_topic = completed_topics[0]

    elif question_count < 4 and len(completed_topics) > 1:
        current_topic = completed_topics[1]

    elif question_count < 6 and len(completed_topics) > 2:
        current_topic = completed_topics[2]

    elif question_count < 8 and len(completed_topics) > 3:
        current_topic = completed_topics[3]

    else:
        # After four topics have been covered,
        # continue with a topic that was already covered.
        if topics_covered:
            current_topic = topics_covered[-1]
        elif completed_topics:
            current_topic = completed_topics[0]
        else:
            current_topic = "General AI"

    conversation = ""

    for message in history:
        conversation += (
            f"{message['role']}: "
            f"{message['content']}\n"
        )

    prompt = f"""
You are conducting a realistic technical interview.

Candidate:
{candidate}

Current interview question number:
{question_count + 1}

Current topic:
{current_topic}

Topics already covered:
{topics_covered}

Previous conversation:
{conversation}

Candidate's latest answer:
{answer}

Instructions:

1. Ask exactly ONE technical question.
2. The question must relate to the current topic.
3. Use the candidate's previous answer to create
   an intelligent follow-up when appropriate.
4. Do not repeat an earlier question.
5. Test technical depth and reasoning.
6. Do not provide the answer.
7. Keep the interview realistic.

Ask the next question.
"""

    next_question = ask_gemini(prompt)

    add_message(
        session_id,
        "interviewer",
        next_question
    )

    add_topic(session_id, current_topic)

    increment_question(session_id)

    return next_question


def generate_feedback(session_id):

    session = get_session(session_id)

    if not session:
        return {
            "error": "Interview session not found"
        }

    history = session["history"]

    question_count = get_question_count(session_id)

    topics_covered = get_topics(session_id)

    conversation = ""

    for message in history:
        conversation += (
            f"{message['role']}: "
            f"{message['content']}\n"
        )

    prompt = f"""
You are a senior technical interviewer.

Analyze the complete interview below.

Question count:
{question_count}

Topics covered:
{topics_covered}

Interview conversation:
{conversation}

Generate structured feedback.

Return:

Overall Score: X/10

Questions Asked:
- ...

Topics Covered:
- ...

Technical Strengths:
- ...

Areas for Improvement:
- ...

Strong Topics:
- ...

Weak Topics:
- ...

Communication:
- ...

Problem Solving:
- ...

Final Recommendation:
- ...

Actionable Next Steps:
- ...

Base the feedback only on the candidate's
actual answers.
"""

    return ask_gemini(prompt)