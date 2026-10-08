def get_cover_letter_prompt(resume_text: str, jd_text: str):

    return f"""
You are an expert HR recruiter and professional career coach.

Using the following resume and job description, generate a professional cover letter.

Resume:
{resume_text}

Job Description:
{jd_text}

Instructions:

- Return ONLY valid JSON.
- Do not include markdown.
- Do not include explanations.
- If the company name is available, extract it.
- If the job title is available, extract it.
- Use professional language.
- Do not invent information that is not in the resume.
- The cover letter should be between 300 and 400 words.

Return exactly in this format:

{{
    "candidate_name":"",
    "email":"",
    "phone":"",
    "linkedin":"",
    "company_name":"",
    "job_title":"",
    "subject":"Application for the Position of ...",
    "introduction":"",
    "body":"",
    "closing_paragraph":"",
    "closing":"Yours sincerely,"
}}
"""