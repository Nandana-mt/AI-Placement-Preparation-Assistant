def get_resume_prompt(resume_text):
    return f"""
You are an ATS (Applicant Tracking System).

Analyze the following resume.

Return ONLY valid JSON.

Use this exact format:

{{
    "ats_score": 0,
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "suggestions": []
}}

Resume:
{resume_text}
"""