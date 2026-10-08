def get_evaluation_prompt(questions, answers):
    return f"""
You are an experienced Technical Interviewer.

Evaluate the candidate's answers.

Return ONLY valid JSON.

Use this exact format:

{{
    "overall_score": 0,
    "question_wise_feedback": [
        {{
            "question": "",
            "score": 0,
            "feedback": ""
        }}
    ],
    "strengths": [],
    "weaknesses": [],
    "suggestions": []
}}

Questions:
{questions}

Candidate Answers:
{answers}
"""