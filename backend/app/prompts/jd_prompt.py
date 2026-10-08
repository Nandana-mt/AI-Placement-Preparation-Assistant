def get_jd_prompt(resume_text, jd_text):
    return f"""
You are an ATS (Applicant Tracking System).

Compare the following Resume with the Job Description.

Return ONLY valid JSON.

Use this exact format:

{{
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "missing_keywords": [],
    "suggestions": []
}}

Resume:
{resume_text}

Job Description:
{jd_text}
"""