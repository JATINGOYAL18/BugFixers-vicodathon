sessions = {}


def create_session(session_id, candidate):
    sessions[session_id] = {
        "candidate": candidate,
        "history": [],
        "question_count": 0,
        "topics_covered": []
    }


def add_message(session_id, role, content):
    if session_id not in sessions:
        return

    sessions[session_id]["history"].append({
        "role": role,
        "content": content
    })


def get_session(session_id):
    return sessions.get(session_id)


def increment_question(session_id):
    if session_id in sessions:
        sessions[session_id]["question_count"] += 1


def get_question_count(session_id):
    if session_id in sessions:
        return sessions[session_id]["question_count"]

    return 0


def add_topic(session_id, topic):
    if session_id in sessions:
        if topic not in sessions[session_id]["topics_covered"]:
            sessions[session_id]["topics_covered"].append(topic)


def get_topics(session_id):
    if session_id in sessions:
        return sessions[session_id]["topics_covered"]

    return []