def get_interview_prompt(resume_text, jd_text):
    return f"""
You are an experienced Technical Interviewer.

Based on the Resume and Job Description, generate:

- 3 HR Questions
- 5 Technical Questions

Return ONLY valid JSON.

Use this format:

{{
    "hr_questions": [],
    "technical_questions": []
}}

Resume:
{resume_text}

Job Description:
{jd_text}
"""