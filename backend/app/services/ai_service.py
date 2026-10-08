import os
import json
from dotenv import load_dotenv
from groq import Groq

from app.prompts.resume_prompt import get_resume_prompt
from app.prompts.jd_prompt import get_jd_prompt
from app.prompts.interview_prompt import get_interview_prompt
from app.prompts.evaluation_prompt import get_evaluation_prompt
from app.prompts.cover_letter_prompt import get_cover_letter_prompt


load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def call_llm(prompt: str):
    """
    Sends the prompt to Groq and returns the parsed JSON response.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.3,
    )

    result = response.choices[0].message.content

    # Remove markdown code fences if Groq returns them
    result = result.replace("```json", "").replace("```", "").strip()

    return json.loads(result)


# -------------------------------------------------------
# Resume Analysis
# -------------------------------------------------------

def analyze_resume(resume_text: str):
    try:
        prompt = get_resume_prompt(resume_text)
        return call_llm(prompt)

    except Exception as e:
        return {
            "error": str(e)
        }


# -------------------------------------------------------
# Resume vs Job Description Matching
# -------------------------------------------------------

def compare_resume_with_jd(resume_text: str, jd_text: str):
    try:
        prompt = get_jd_prompt(resume_text, jd_text)
        return call_llm(prompt)

    except Exception as e:
        return {
            "error": str(e)
        }


# -------------------------------------------------------
# Interview Question Generation
# -------------------------------------------------------

def generate_interview_questions(resume_text: str, jd_text: str):
    try:
        prompt = get_interview_prompt(resume_text, jd_text)
        return call_llm(prompt)

    except Exception as e:
        return {
            "error": str(e)
        }


# -------------------------------------------------------
# Interview Evaluation
# -------------------------------------------------------

def evaluate_interview(questions, answers):
    try:
        prompt = get_evaluation_prompt(questions, answers)
        return call_llm(prompt)

    except Exception as e:
        return {
            "error": str(e)
        }


# -------------------------------------------------------
# Cover Letter Generation
# -------------------------------------------------------

def generate_cover_letter(resume_text: str, jd_text: str):
    try:
        prompt = get_cover_letter_prompt(resume_text, jd_text)
        return call_llm(prompt)

    except Exception as e:
        return {
            "error": str(e)
        }


